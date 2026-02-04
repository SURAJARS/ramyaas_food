import express from 'express';
import { uploadImage } from '../utils/multerConfig.js';
import {
  getAllMenuImages,
  createMenuImage,
  updateMenuImage,
  deleteMenuImage
} from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getAllMenuImages);
router.post('/', uploadImage.single('image'), createMenuImage);
router.put('/:id', uploadImage.single('image'), updateMenuImage);
router.delete('/:id', deleteMenuImage);

export default router;
