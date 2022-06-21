import { boolean, number, object, string } from 'yup';

import { productSupplierSchema } from './productSupplier.schema';

export const productStockSchema = object().shape({
  stockId: string().uuid().required(),
  increaseValuePercentage: number().required(),
  isAvailable: boolean().required(),
  unityValueToSell: number().required(),
  quantity: number().required(),
  supplier: productSupplierSchema.required(),
});
