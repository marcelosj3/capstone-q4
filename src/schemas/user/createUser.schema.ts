import { boolean, object, string } from 'yup';
import { hashSync } from 'bcrypt';

import { CompanyRole } from '../../entities/user.entity';

export const createUserSchema = object().shape({
  name: string().required(),
  email: string().email().lowercase().required(),
  cpf: string()
    .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Valid format: 999.999.999-99')
    .required(),
  password: string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  isActive: boolean().default(false).optional(),
  isEmployee: boolean().default(false).optional(),
  companyRole: string()
    .oneOf(Object.values(CompanyRole))
    .default(CompanyRole.CLIENT)
    .optional(),
});
