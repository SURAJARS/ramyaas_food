import express from 'express';
import { uploadVideo } from '../utils/multerConfig.js';
import {
  getAllReels,
  createReel,
  updateReel,
  deleteReel
} from '../controllers/reelController.js';

const router = express.Router();

router.get('/', getAllReels);
router.post('/', uploadVideo.single('video'), createReel);
router.put('/:id', uploadVideo.single('video'), updateReel);
router.delete('/:id', deleteReel);

export default router;
