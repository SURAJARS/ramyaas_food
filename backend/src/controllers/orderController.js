import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpay;

const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return razorpay;
};

// Generate unique order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export const createOrder = async (req, res) => {
  try {
    const { customer, items, subtotal, shippingCost, discountCode, discountAmount } = req.body;

    const orderNumber = generateOrderNumber();
    const totalAmount = subtotal + shippingCost - discountAmount;

    // Create Razorpay order
    const razorpayOrder = await getRazorpay().orders.create({
      amount: totalAmount * 100, // Convert to paise
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        customerName: customer.name,
        customerEmail: customer.email
      }
    });

    const order = new Order({
      orderNumber,
      customer,
      items,
      subtotal,
      shippingCost,
      discountCode,
      discountAmount,
      totalAmount,
      razorpayOrderId: razorpayOrder.id
    });

    await order.save();

    res.status(201).json({
      orderId: order._id,
      orderNumber,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(order.razorpayOrderId + '|' + razorpayPaymentId);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpaySignature) {
      order.paymentStatus = 'paid';
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      order.orderStatus = 'confirmed';
      await order.save();

      res.json({
        success: true,
        message: 'Payment verified successfully',
        order
      });
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, notes } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, notes, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
