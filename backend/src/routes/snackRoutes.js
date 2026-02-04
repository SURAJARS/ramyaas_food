import express from 'express';
import { uploadImage } from '../utils/multerConfig.js';
import {
  getAllSnacks,
  getSnackById,
  createSnack,
  updateSnack,
  deleteSnack
} from '../controllers/snackController.js';

const router = express.Router();

router.get('/', getAllSnacks);
router.get('/:id', getSnackById);
router.post('/', uploadImage.single('image'), createSnack);
router.put('/:id', uploadImage.single('image'), updateSnack);
router.delete('/:id', deleteSnack);

export default router;
