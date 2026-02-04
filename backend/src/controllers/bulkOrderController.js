import BulkOrder from '../models/BulkOrder.js';
import { sendBulkOrderEmail } from '../utils/emailService.js';

export const getAllBulkOrders = async (req, res) => {
  try {
    const orders = await BulkOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBulkOrder = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const order = new BulkOrder({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      item: req.body.item,
      itemTA: req.body.itemTA || req.body.item,
      itemEN: req.body.itemEN || req.body.item,
      quantity: req.body.quantity,
      unit: req.body.unit,
      unitTA: req.body.unitTA || req.body.unit,
      unitEN: req.body.unitEN || req.body.unit,
      deliveryLocation: req.body.deliveryLocation,
      deliveryLocationTA: req.body.deliveryLocationTA || req.body.deliveryLocation,
      deliveryLocationEN: req.body.deliveryLocationEN || req.body.deliveryLocation,
      budget: req.body.budget,
      budgetTA: req.body.budgetTA || req.body.budget,
      budgetEN: req.body.budgetEN || req.body.budget,
      remarks: req.body.remarks,
      remarksTA: req.body.remarksTA || req.body.remarks,
      remarksEN: req.body.remarksEN || req.body.remarks
    });

    const newOrder = await order.save();
    
    // Send email notification
    try {
      await sendBulkOrderEmail(newOrder);
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the request if email fails
    }
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Bulk order creation error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateBulkOrder = async (req, res) => {
  try {
    const order = await BulkOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.body.status) order.status = req.body.status;
    order.updatedAt = new Date();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBulkOrder = async (req, res) => {
  try {
    await BulkOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
