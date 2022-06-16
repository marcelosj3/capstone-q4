import { hashSync } from 'bcrypt';
import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../types';
import { cpfMatches } from '../../utils';

export const updateUserSchema = object().shape({
  name: string().nullable().notRequired(),
  email: string().email().lowercase().nullable().notRequired(),
  cpf: string()
    .matches(cpfMatches.regex, cpfMatches.message)
    .nullable()
    .notRequired(),
  password: string()
    .min(6, 'At least 6 characters required')
    .transform((pwd: string) => hashSync(pwd, 8))
    .nullable()
    .notRequired(),
  isActive: boolean().notRequired(),
  isEmployee: boolean().notRequired(),
  companyRole: string().oneOf(Object.values(CompanyRole)).notRequired(),
});
