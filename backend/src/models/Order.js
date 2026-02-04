import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    nameTA: String,
    price: Number,
    quantity: Number,
    quantityUnit: String
  }],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 50 },
  discountCode: String,
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'cancelled'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['new', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'new'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
