import { array, boolean, number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';
import { serializedStockSchema } from '../stocks';

export const serializedGetProductSchema = array().of(
  object().shape({
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
    stock: array().of(serializedStockSchema),
  })
);
