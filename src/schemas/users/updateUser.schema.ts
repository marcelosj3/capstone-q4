import { hashSync } from 'bcrypt';
import { boolean, object, string } from 'yup';

import { CompanyRole } from '../../types';
import { companyRoleMatches, cpfMatches, emailFormat } from '../../utils/';
import { capitalizeText } from '../../utils/generics/capitalizeText.util';

export const updateUserSchema = object().shape({
  name: string()
    .notRequired()
    .transform((name: string) => capitalizeText(name)),
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
  oldPassword: string().notRequired(),
  isActive: boolean().notRequired(),
  isEmployee: boolean().notRequired(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole), companyRoleMatches.message)
    .notRequired(),
});
