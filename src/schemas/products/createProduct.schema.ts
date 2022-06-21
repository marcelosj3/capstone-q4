import { number, object, string } from 'yup';

import { cnpjMatches, expiryDateMatches } from '../../utils';

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
  increaseValuePercentage: number().default(30).optional(),
  supplier: object()
    .shape({
      name: string().required(),
      cnpj: string().matches(cnpjMatches.regex, cnpjMatches.message).required(),
    })
    .required(),
});
