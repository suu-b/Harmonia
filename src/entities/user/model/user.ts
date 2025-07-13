import mongoose, { Schema } from 'mongoose';
import { IUser } from './types';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
