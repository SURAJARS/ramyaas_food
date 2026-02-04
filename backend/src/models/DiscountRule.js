import mongoose from 'mongoose';

const discountRuleSchema = new mongoose.Schema({
  nameTA: { type: String },
  nameEN: { type: String },
  name: { type: String },
  minOrderValue: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  freeShipping: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('DiscountRule', discountRuleSchema);
