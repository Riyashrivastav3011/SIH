import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eta_railways';
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

export default connectDB;