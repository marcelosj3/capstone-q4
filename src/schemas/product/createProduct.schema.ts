import { number, object, string } from 'yup';

import {
  cnpjMessage,
  cnpjRegex,
  expiryDateMessage,
  expiryDateRegex,
} from '../../utils';

export const createProductSchema = object().shape({
  name: string().required(),
  brand: string().required(),
  category: string().required(),
  description: string().nullable().notRequired(),
  expiryDate: string()
    .matches(expiryDateRegex, expiryDateMessage)
    .nullable()
    .notRequired(),
  quantity: number().integer().required(),
  supplier: object()
    .shape({
      name: string().required(),
      cnpj: string().matches(cnpjRegex, cnpjMessage).required(),
      unityValue: number().required(),
    })
    .required(),
});
