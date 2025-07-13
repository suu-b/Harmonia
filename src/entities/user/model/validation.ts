import Joi from 'joi';
import { User } from '@/shared/types/global-types';

export default function validateUser(dataToCheck: User): boolean {
  const expectedUserStructure = Joi.object({
    username: Joi.string().required(),
    mail: Joi.string().email().required(),
    profileImageUrl: Joi.string().required(),
  });

  const { error } = expectedUserStructure.validate(dataToCheck);
  if (error) {
    console.error('Data validation failed:', error);
    return false;
  }
  return true;
}
