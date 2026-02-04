import mongoose from 'mongoose';

const snackItemSchema = new mongoose.Schema({
  nameTA: { type: String, required: true },
  nameEN: { type: String, required: true },
  descriptionTA: { type: String },
  descriptionEN: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  isEnabled: { type: Boolean, default: true },
  category: {
    type: String,
    enum: ['podi', 'pickle', 'snacks', 'sweets'],
    default: 'snacks'
  },
  quantityUnit: {
    type: String,
    enum: ['pieces', 'grams', 'kgs', 'litre'],
    default: 'pieces'
  },
  stock: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('SnackItem', snackItemSchema);
