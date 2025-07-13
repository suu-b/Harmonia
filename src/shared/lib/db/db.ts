import mongoose from 'mongoose';

let isConnected = false;

const connectToMongoDB = async (): Promise<void> => {
  const uri: string | undefined = process.env.NEXT_PUBLIC_MONGODB_URI;
  if (isConnected) return;

  if (!uri) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectToMongoDB;
