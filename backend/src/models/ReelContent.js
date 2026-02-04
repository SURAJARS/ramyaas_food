import mongoose from 'mongoose';

const reelContentSchema = new mongoose.Schema({
  titleTA: { type: String, required: true },
  titleEN: { type: String, required: true },
  descriptionTA: { type: String },
  descriptionEN: { type: String },
  type: { type: String, enum: ['upload', 'instagram'], default: 'upload' },
  videoFile: { type: String },
  instagramLink: { type: String },
  thumbnail: { type: String },
  displayOrder: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ReelContent', reelContentSchema);
