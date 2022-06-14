import { boolean, object, string, array } from 'yup';

import { CompanyRole } from '../../entities';
import { serializedCreatedAddressSchema } from '../address';

export const serializedCreatedUserSchema = object().shape({
  userId: string().uuid().required(),
  name: string().required(),
  email: string().email().required(),
  isActive: boolean().required(),
  isEmployee: boolean().required(),
  companyRole: string().oneOf(Object.values(CompanyRole)).required(),
  address: array().of(serializedCreatedAddressSchema).notRequired(),
});
