import { boolean, number, object, string } from 'yup';

import { serializedSupplierSchema } from '../suppliers';

export const serializedStockSchema = object().shape({
  stockId: string().uuid(),
  increaseValuePercentage: number().integer(),
  isAvailable: boolean(),
  quantity: number().integer(),
  unityValueToSell: number(),
  productId: string().uuid(),
  // supplier: serializedSupplierSchema,
});
