import CateringOrder from '../models/CateringOrder.js';
import { sendCateringEnquiryEmail } from '../utils/emailService.js';

export const getAllCateringOrders = async (req, res) => {
  try {
    const orders = await CateringOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCateringOrder = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const order = new CateringOrder({
      name: req.body.name,
      nameTA: req.body.nameTA || req.body.name,
      nameEN: req.body.nameEN || req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      eventType: req.body.eventType,
      eventTypeTA: req.body.eventTypeTA || req.body.eventType,
      eventTypeEN: req.body.eventTypeEN || req.body.eventType,
      eventDate: req.body.eventDate,
      guestCount: req.body.guestCount,
      location: req.body.location,
      locationTA: req.body.locationTA || req.body.location,
      locationEN: req.body.locationEN || req.body.location,
      budget: req.body.budget,
      budgetTA: req.body.budgetTA || req.body.budget,
      budgetEN: req.body.budgetEN || req.body.budget,
      specialRequests: req.body.specialRequests,
      specialRequestsTA: req.body.specialRequestsTA || req.body.specialRequests,
      specialRequestsEN: req.body.specialRequestsEN || req.body.specialRequests
    });

    const newOrder = await order.save();
    
    // Send email notification
    try {
      await sendCateringEnquiryEmail(newOrder);
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the request if email fails
    }
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Catering order creation error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateCateringOrder = async (req, res) => {
  try {
    const order = await CateringOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.body.status) order.status = req.body.status;
    order.updatedAt = new Date();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCateringOrder = async (req, res) => {
  try {
    await CateringOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
