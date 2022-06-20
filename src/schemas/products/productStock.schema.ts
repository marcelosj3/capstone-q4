import { boolean, number, object, string } from 'yup';

export const productStockSchema = object().shape({
  stockId: string().uuid().required(),
  increaseValuePercentage: number().required(),
  isAvailable: boolean().required(),
  unityValueToSell: number().required(),
});
