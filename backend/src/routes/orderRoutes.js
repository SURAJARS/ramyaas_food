import express from 'express';
import {
  createOrder,
  verifyPayment,
  getOrder,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// Specific routes first
router.post('/verify', verifyPayment);
router.get('/', getAllOrders);

// General create/get/update routes
router.post('/', createOrder);
router.get('/:id', getOrder);
router.put('/:id', updateOrderStatus);

export default router;
