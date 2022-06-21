import { boolean, number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';

export const serializedCustomerProductSchema = object().shape({
  productId: string().uuid(),
  name: string().lowercase(),
  brand: string().lowercase(),
  category: string().lowercase(),
  description: string().lowercase(),
  expiryDate: string().matches(
    expiryDateMatches.regex,
    expiryDateMatches.message
  ),
  quantity: number().integer(),
  unityValueToSell: number(),
  isAvailable: boolean(),
  onSale: boolean(),
});
