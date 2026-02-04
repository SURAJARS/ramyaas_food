import express from 'express';
import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/enquiryController.js';

const router = express.Router();

router.get('/', getAllEnquiries);
router.post('/', createEnquiry);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;
