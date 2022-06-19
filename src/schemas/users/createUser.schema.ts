import { hashSync } from 'bcrypt';
import { boolean, object, string, lazy, mixed } from 'yup';

import { CompanyRole } from '../../types';
import { cpfMatches } from '../../utils';
import { createAddressSchema } from '../addresses';

export const createUserSchema = object().shape({
  name: string().required(),
  email: string().email().lowercase().required(),
  cpf: string()
    .matches(cpfMatches.regex, { message: cpfMatches.message })
    .required(),
  password: string()
    .min(6, 'At least 6 characters required')
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .optional(),
  address: lazy((value) => {
    if (value !== undefined) {
      return createAddressSchema;
    }

    return mixed().notRequired();
  }),
});
