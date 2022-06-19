import { hashSync } from 'bcrypt';
import { boolean, object, string, lazy, mixed } from 'yup';

import { CompanyRole } from '../../types';
import { capitalizeText, cpfMatches } from '../../utils';
import { companyRoleMatches, emailFormat } from '../../utils/users';
import { createAddressSchema } from '../addresses';

export const createUserSchema = object().shape({
  name: string()
    .required()
    .transform((name: string) => capitalizeText(name)),
  email: string().email(emailFormat.message).lowercase().required(),
  cpf: string().matches(cpfMatches.regex, cpfMatches.message).required(),
  password: string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole), companyRoleMatches.message)
    .default(CompanyRole.CLIENT)
    .optional(),
  address: lazy((value) => {
    if (value !== undefined) {
      return createAddressSchema;
    }

    return mixed().notRequired();
  }),
});
