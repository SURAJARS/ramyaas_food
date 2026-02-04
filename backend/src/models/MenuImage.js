import mongoose from 'mongoose';

const menuImageSchema = new mongoose.Schema({
  titleTA: { type: String },
  titleEN: { type: String },
  image: { type: String, required: true },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MenuImage', menuImageSchema);
