import mongoose from 'mongoose';

const shippingConfigSchema = new mongoose.Schema({
  nameTA: { type: String, default: 'பொதுவான' },
  nameEN: { type: String, default: 'General' },
  shippingCharge: { type: Number, required: true, default: 50 },
  freeShippingThreshold: { type: Number, default: 500 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ShippingConfig', shippingConfigSchema);
