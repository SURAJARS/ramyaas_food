import express from 'express';
import {
  getAllCateringOrders,
  createCateringOrder,
  updateCateringOrder,
  deleteCateringOrder
} from '../controllers/cateringController.js';

const router = express.Router();

router.get('/', getAllCateringOrders);
router.post('/', createCateringOrder);
router.put('/:id', updateCateringOrder);
router.delete('/:id', deleteCateringOrder);

export default router;
