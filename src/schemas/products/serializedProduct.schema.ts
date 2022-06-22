import { boolean, lazy, mixed, number, object, string } from 'yup';

import { serializedStockSchema } from '../stocks';

export const serializedProductSchema = object().shape({
  productId: string().uuid(),
  name: string(),
  brand: string(),
  category: string(),
  description: string(),
  expiryDate: string(),
  onSale: boolean().optional(),
  quantity: number().integer(),
  unityValue: number(),
  stock: lazy((value) => {
    if (value !== undefined) return serializedStockSchema;
    return mixed().notRequired();
  }),
});
