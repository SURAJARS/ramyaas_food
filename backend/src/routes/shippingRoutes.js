import express from 'express';
import {
  getShippingConfig,
  updateShippingConfig
} from '../controllers/shippingController.js';

const router = express.Router();

router.get('/', getShippingConfig);
router.put('/', updateShippingConfig);

export default router;
