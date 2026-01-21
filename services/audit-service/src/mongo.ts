import mongoose from 'mongoose';

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI || '');
  console.log('🍃 MongoDB connected (audit)');
};

const AuditSchema = new mongoose.Schema({
  eventType: String,
  payload: Object,
  service: String,
  createdAt: { type: Date, default: Date.now }
});

export const AuditModel = mongoose.model('Audit', AuditSchema);
