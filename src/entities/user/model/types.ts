import { Document } from 'mongoose';
import { User } from '@/shared/types/global-types';

export interface IUser extends User, Document {}
