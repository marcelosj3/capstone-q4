import { boolean, object, string } from 'yup';
import { hashSync } from 'bcrypt';

import { CompanyRole } from '../../entities/user.entity';

export const updateUserSchema = object().shape({
  name: string().notRequired(),
  email: string().email().lowercase().notRequired(),
  cpf: string()
    .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Valid format: 999.999.999-99')
    .notRequired(),
  password: string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .notRequired(),
    isActive: boolean().default(false).optional(),
    isEmployee: boolean().default(false).optional(),
    companyRole: string()
      .oneOf(Object.values(CompanyRole))
      .default(CompanyRole.CLIENT)
      .optional(),
});
