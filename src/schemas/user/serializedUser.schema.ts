import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities';

export const serializedCreatedUserSchema = object().shape({
  userId: string().uuid().required(),
  name: string().required(),
  email: string().email().lowercase().required(),
  isActive: boolean().default(false).required(),
  isEmployee: boolean().default(false).required(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .required(),
});
