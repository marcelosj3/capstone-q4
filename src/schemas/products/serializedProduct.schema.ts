import { lazy, mixed, number } from 'yup';
import { boolean, object, string } from 'yup';

import { serializedStockSchema } from '../stocks';

export const serializedProductSchema = object().shape({
  productId: string().uuid(),
  name: string(),
  brand: string(),
  category: string(),
  description: string(),
  expiryDate: string(),
  onSale: boolean(),
  quantity: number().integer(),
  unityValueToSell: number(),
  stock: lazy((value) => {
    if (value !== undefined) return serializedStockSchema;
    return mixed().notRequired();
  }),
});
