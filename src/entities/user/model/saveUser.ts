import validateUser from './validation';
import { userModel } from './user';
import { IUser } from './types';
import connectToMongoDB from '@/shared/lib/db/db';
import { User } from '@/shared/types/global-types';

export async function saveUserIfNotExists(userToSave: User) {
  await connectToMongoDB();
  const existingUser = await userModel.findOne({ mail: userToSave.mail });
  if (existingUser) {
    return { alreadyExists: true };
  }
  const isUserValid = validateUser(userToSave as IUser);
  if (!isUserValid) {
    throw new Error('Invalid user data');
  }
  await userModel.create(userToSave);
  return { saved: true };
}
