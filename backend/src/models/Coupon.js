import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  codeTA: { type: String },
  codeEN: { type: String },
  code: { type: String, required: true, unique: true },
  descriptionTA: { type: String },
  descriptionEN: { type: String },
  description: { type: String },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  maxDiscount: { type: Number },
  minOrderValue: { type: Number, default: 0 },
  maxUsage: { type: Number },
  usageCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Coupon', couponSchema);
