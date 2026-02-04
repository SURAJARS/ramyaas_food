import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  messageTA: { type: String },
  messageEN: { type: String },
  message: { type: String },
  type: { type: String, enum: ['general', 'complaint', 'feedback'], default: 'general' },
  status: { type: String, enum: ['new', 'replied', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Enquiry', enquirySchema);
