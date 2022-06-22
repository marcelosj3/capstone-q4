import { number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';
import { createSupplierSchema } from '../suppliers';

export const createProductSchema = object().shape({
  name: string().required(),
  brand: string().required(),
  category: string().required(),
  description: string().nullable().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .nullable()
    .notRequired(),
  quantity: number().integer().required(),
  unityValue: number().required(),
  increaseValuePercentage: number().integer().default(30).optional(),
  supplier: createSupplierSchema.required(),
});
