import { hashSync } from 'bcrypt';
import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../types';
import { companyRoleMatches, cpfMatches, emailFormat } from '../../utils';

export const updateUserSchema = object().shape({
  name: string().nullable().notRequired(),
  email: string()
    .email(emailFormat.message)
    .lowercase()
    .nullable()
    .notRequired(),
  cpf: string()
    .matches(cpfMatches.regex, cpfMatches.message)
    .nullable()
    .notRequired(),
  password: string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .nullable()
    .notRequired(),
  isActive: boolean().notRequired(),
  isEmployee: boolean().notRequired(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole), companyRoleMatches.message)
    .notRequired(),
});
