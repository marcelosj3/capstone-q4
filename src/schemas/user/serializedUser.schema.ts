import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities/user.entity';

export const serializedCreateUserSchema = object().shape({
  userId: string().uuid().required(),
  name: string().required(),
  email: string().email().lowercase().required(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .optional(),
});
