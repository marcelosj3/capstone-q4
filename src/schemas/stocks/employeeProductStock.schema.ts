import { boolean, number, object, string } from 'yup';

import { supplierSerializerSchema } from '../suppliers';

export const employeeProductStockSchema = object().shape({
  stockId: string().uuid().required(),
  increaseValuePercentage: number().required(),
  isAvailable: boolean().required(),
  quantity: number().integer().required(),
  unityValueToSell: number().required(),
  supplier: supplierSerializerSchema.required(),
});
