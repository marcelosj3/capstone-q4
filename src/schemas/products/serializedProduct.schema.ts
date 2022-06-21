import { boolean, object, string } from 'yup';

import { productStockSchema } from '../stocks/productStock.schema';
import { productSupplierSchema } from '../suppliers/productSupplier.schema';

export const serializedProductSchema = object().shape({
  productId: string().uuid(),
  name: string(),
  brand: string(),
  category: string(),
  description: string().nullable().notRequired(),
  expiryDate: string().nullable().notRequired(),
  onSale: boolean().required(),
  stock: productStockSchema.required(),
});
