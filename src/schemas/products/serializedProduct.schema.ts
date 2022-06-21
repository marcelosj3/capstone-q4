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
  stock: serializedStockSchema.optional(),
});
