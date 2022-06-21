import { number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';
import { updateSupplierSchema } from '../suppliers';

export const updateProductSchema = object().shape({
  name: string().nullable().notRequired(),
  brand: string().nullable().notRequired(),
  category: string().nullable().notRequired(),
  description: string().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  quantity: number().integer().notRequired(),
  supplier: updateSupplierSchema.notRequired(),
});
