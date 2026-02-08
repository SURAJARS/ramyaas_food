import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  quantity: { type: String, required: true }, // e.g., "250g", "500g", "1kg"
  price: { type: Number, required: true },
  _id: false
});

const snackItemSchema = new mongoose.Schema({
  nameTA: { type: String, required: true },
  nameEN: { type: String, required: true },
  descriptionTA: { type: String },
  descriptionEN: { type: String },
  image: { type: String },
  isEnabled: { type: Boolean, default: true },
  category: {
    type: String,
    enum: ['podi', 'pickle', 'snacks', 'sweets'],
    default: 'snacks'
  },
  variants: [variantSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('SnackItem', snackItemSchema);
