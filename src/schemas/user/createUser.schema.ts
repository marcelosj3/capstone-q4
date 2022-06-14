import { hashSync } from 'bcrypt';
import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities';
import { cpfMessage, cpfRegex } from '../../utils';

export const createUserSchema = object().shape({
  name: string().required(),
  email: string().email().lowercase().required(),
  cpf: string().matches(cpfRegex, cpfMessage).required(),
  password: string()
    .min(6, 'Minimum 6 characters required')
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .optional(),
});
