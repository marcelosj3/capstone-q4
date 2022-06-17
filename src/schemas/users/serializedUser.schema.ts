import { array, boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities';
import { serializedCreatedAddressSchema } from '../addresses';

export const serializedCreatedUserSchema = object().shape({
  userId: string().uuid().required(),
  name: string().required(),
  email: string().email().required(),
  isActive: boolean().required(),
  isEmployee: boolean().required(),
  companyRole: string().oneOf(Object.values(CompanyRole)).required(),
  address: array().of(serializedCreatedAddressSchema).default([]).optional(),
});
