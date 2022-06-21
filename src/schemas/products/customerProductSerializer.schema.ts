import { boolean, number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';

export const customerProductSerializerSchema = object().shape({
  productId: string().uuid().required(),
  name: string().lowercase().required(),
  brand: string().lowercase().required(),
  category: string().lowercase().required(),
  description: string().lowercase().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  quantity: number().integer().required(),
  unityValueToSell: number().required(),
  isAvailable: boolean().default(true).optional(),
  onSale: boolean().default(false).optional(),
});
