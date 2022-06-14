import { boolean, number, object, string } from 'yup';

import {
  cnpjMessage,
  cnpjRegex,
  expiryDateMessage,
  expiryDateRegex,
} from '../../utils';

export const serializedCreatedProductSchema = object().shape({
  productId: string().uuid().required(),
  name: string().required(),
  brand: string().required(),
  category: string().required(),
  description: string().nullable().notRequired(),
  expiryDate: string()
    .matches(expiryDateRegex, expiryDateMessage)
    .nullable()
    .notRequired(),
  stock: object().shape({
    stockId: string().uuid().required(),
    increaseValuePercentage: number().default(30).required(),
    isAvailable: boolean().default(true).required(),
    unityValueToSell: number().required(),
    supplier: object().shape({
      supplierId: string().uuid().required(),
      name: string().required(),
      cnpj: string().matches(cnpjRegex, cnpjMessage).required(),
      unityValue: number().required(),
    }),
  }),
});
