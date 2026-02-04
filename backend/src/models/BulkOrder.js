import mongoose from 'mongoose';

const bulkOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  itemTA: { type: String },
  itemEN: { type: String },
  item: { type: String },
  quantity: { type: Number, required: true },
  unitTA: { type: String },
  unitEN: { type: String },
  unit: { type: String },
  deliveryLocationTA: { type: String },
  deliveryLocationEN: { type: String },
  deliveryLocation: { type: String },
  budgetTA: { type: String },
  budgetEN: { type: String },
  budget: { type: String },
  remarksTA: { type: String },
  remarksEN: { type: String },
  remarks: { type: String },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'rejected', 'completed'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('BulkOrder', bulkOrderSchema);
