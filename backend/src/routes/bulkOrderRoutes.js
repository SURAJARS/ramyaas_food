import express from 'express';
import {
  getAllBulkOrders,
  createBulkOrder,
  updateBulkOrder,
  deleteBulkOrder
} from '../controllers/bulkOrderController.js';

const router = express.Router();

router.get('/', getAllBulkOrders);
router.post('/', createBulkOrder);
router.put('/:id', updateBulkOrder);
router.delete('/:id', deleteBulkOrder);

export default router;
