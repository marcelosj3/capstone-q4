import { number, object, string } from 'yup';

import {
  cnpjMessage,
  cnpjRegex,
  expiryDateMessage,
  expiryDateRegex,
} from '../../utils';

export const updateProductSchema = object().shape({
  name: string().nullable().notRequired(),
  brand: string().nullable().notRequired(),
  category: string().nullable().notRequired(),
  description: string().nullable().notRequired(),
  expiryDate: string()
    .matches(expiryDateRegex, expiryDateMessage)
    .nullable()
    .notRequired(),
  quantity: number().integer().nullable().notRequired(),
  supplier: object()
    .shape({
      name: string().nullable().notRequired(),
      cnpj: string().matches(cnpjRegex, cnpjMessage).nullable().notRequired(),
      unityValue: number().nullable().notRequired(),
    })
    .nullable()
    .notRequired(),
});
