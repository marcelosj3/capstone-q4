import { boolean, object, string } from 'yup';

import { productStockSchema } from './productStock.schema';

export const serializedCreatedProductSchema = object().shape({
  productId: string().uuid().required(),
  name: string().required(),
  brand: string().required(),
  category: string().required(),
  description: string().nullable().notRequired(),
  expiryDate: string().nullable().notRequired(),
  onSale: boolean().required(),
  stock: productStockSchema.required(),
});
