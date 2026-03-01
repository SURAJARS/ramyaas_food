import mongoose from 'mongoose';

const shippingConfigSchema = new mongoose.Schema({
  nameTA: { type: String, default: 'பொதுவான' },
  nameEN: { type: String, default: 'General' },
  shippingCharge: { type: Number, required: true, default: 50 },
  freeShippingThreshold: { type: Number, default: 500 },
  
  // Homepage Banner Fields
  bannerTextEN: { 
    type: String, 
    default: '🎉 Special Offer: Free Shipping on Orders Above ₹500!' 
  },
  bannerTextTA: { 
    type: String, 
    default: '🎉 சிறப்பு விசித்திரம்: ₹500க்கு மேல் உள்ள ஆர்டர்களுக்கு இலவச விநியோகம்!' 
  },
  bannerVisible: { type: Boolean, default: true },
  
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ShippingConfig', shippingConfigSchema);
