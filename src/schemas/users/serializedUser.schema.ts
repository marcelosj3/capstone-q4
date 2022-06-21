import { array, boolean, object, string } from 'yup';

import { CompanyRole } from '../../types';
import { serializedAddressSchema } from '../addresses';

export const serializedUserSchema = object().shape({
  userId: string().uuid(),
  name: string(),
  email: string().email(),
  isActive: boolean(),
  companyRole: string().oneOf(Object.values(CompanyRole)),
  address: array().of(serializedAddressSchema).optional(),
});
