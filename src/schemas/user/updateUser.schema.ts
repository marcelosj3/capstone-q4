import { hashSync } from 'bcrypt';
import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../entities';
import { cpfMessage, cpfRegex } from '../../utils';

export const updateUserSchema = object().shape({
  name: string().nullable().notRequired(),
  email: string().email().lowercase().nullable().notRequired(),
  cpf: string().matches(cpfRegex, cpfMessage).nullable().notRequired(),
  password: string()
    .min(6, 'Minimum 6 characters required')
    .transform((pwd: string) => hashSync(pwd, 8))
    .nullable()
    .notRequired(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .optional(),
});
