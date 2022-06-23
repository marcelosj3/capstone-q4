import { Product } from '../../entities';

export const maxValueToSellUtil = (payload: Array<Product>) => {
  return payload.reduce(
    (acc, { stock: { unityValueToSell } }) => Math.max(acc, unityValueToSell),
    0
  );
};
