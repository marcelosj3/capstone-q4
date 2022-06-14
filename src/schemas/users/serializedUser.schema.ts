import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities';

export const serializedCreatedUserSchema = object().shape({
  userId: string().uuid().required(),
  name: string().required(),
  email: string().email().required(),
  isActive: boolean().required(),
  isEmployee: boolean().required(),
  companyRole: string().oneOf(Object.values(CompanyRole)).required(),
});
