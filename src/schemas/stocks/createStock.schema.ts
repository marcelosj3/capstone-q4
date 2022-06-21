import { boolean, number, object } from 'yup';

import { createSupplierSchema } from '../suppliers';

export const createStockSchema = object().shape({
  increaseValuePercentage: number().integer().default(30).optional(),
  isAvailable: boolean().default(true).optional(),
  quantity: number().integer().required(),
  unityValueToSell: number().integer().default(0).optional(),
  supplier: createSupplierSchema,
});
