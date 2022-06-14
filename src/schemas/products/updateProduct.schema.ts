import { number, object, string } from 'yup';

import { cnpjMatches, expiryDateMatches } from '../../utils';

export const updateProductSchema = object().shape({
  name: string().nullable().notRequired(),
  brand: string().nullable().notRequired(),
  category: string().nullable().notRequired(),
  description: string().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  quantity: number().integer().notRequired(),
  supplier: object()
    .shape({
      name: string().notRequired(),
      cnpj: string()
        .matches(cnpjMatches.regex, cnpjMatches.message)
        .notRequired(),
      unityValue: number().notRequired(),
    })
    .notRequired(),
});
