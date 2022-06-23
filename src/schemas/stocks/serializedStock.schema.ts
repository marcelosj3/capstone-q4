import { mixed } from 'yup';
import { boolean, lazy, number, object, string } from 'yup';

import { serializedSupplierSchema } from '../suppliers';

export const serializedStockSchema = object().shape({
  stockId: string().uuid(),
  increaseValuePercentage: number().integer(),
  isAvailable: boolean(),
  quantity: number().integer(),
  unityValueToSell: number(),
  productId: string().uuid(),
  supplier: lazy((value) => {
    if (value !== undefined) return serializedSupplierSchema;
    return mixed().notRequired();
  }),
});
