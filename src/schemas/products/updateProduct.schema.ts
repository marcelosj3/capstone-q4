import { number, object, string } from 'yup';

import { cnpjMatches, expiryDateMatches } from '../../utils';
import { productSupplierSchema } from '../suppliers';

export const updateProductSchema = object().shape({
  name: string().nullable().notRequired(),
  brand: string().nullable().notRequired(),
  category: string().nullable().notRequired(),
  description: string().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  quantity: number().integer().notRequired(),
  supplier: productSupplierSchema.notRequired(),
});
