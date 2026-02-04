import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SnackItem from './models/SnackItem.js';
import MenuImage from './models/MenuImage.js';
import ReelContent from './models/ReelContent.js';

dotenv.config();

async function fixImagePaths() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Fix SnackItem images
    const snacks = await SnackItem.find({ image: { $regex: '/uploads/' } });
    for (let snack of snacks) {
      snack.image = snack.image.replace('/uploads/images/', '').replace('/uploads/videos/', '');
      await snack.save();
      console.log(`Fixed snack: ${snack.nameTA}`);
    }

    // Fix MenuImage images
    const menuImages = await MenuImage.find({ image: { $regex: '/uploads/' } });
    for (let img of menuImages) {
      img.image = img.image.replace('/uploads/images/', '').replace('/uploads/videos/', '');
      await img.save();
      console.log(`Fixed menu image: ${img.titleTA}`);
    }

    // Fix ReelContent videos
    const reels = await ReelContent.find({ videoFile: { $regex: '/uploads/' } });
    for (let reel of reels) {
      reel.videoFile = reel.videoFile.replace('/uploads/images/', '').replace('/uploads/videos/', '');
      await reel.save();
      console.log(`Fixed reel: ${reel.titleTA}`);
    }

    console.log('✅ All image paths fixed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixImagePaths();
