import mongoose from 'mongoose';

const cateringOrderSchema = new mongoose.Schema({
  nameTA: { type: String, required: true },
  nameEN: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventTypeTA: { type: String },
  eventTypeEN: { type: String },
  eventType: { type: String },
  eventDate: { type: Date },
  guestCount: { type: Number },
  locationTA: { type: String },
  locationEN: { type: String },
  location: { type: String },
  budgetTA: { type: String },
  budgetEN: { type: String },
  budget: { type: String },
  specialRequestsTA: { type: String },
  specialRequestsEN: { type: String },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'rejected', 'completed'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CateringOrder', cateringOrderSchema);
