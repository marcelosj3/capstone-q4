import { Product } from '../../entities';

export const quantityReducer = (payload: Array<Product>) => {
  return payload.reduce((acc, { stock: { quantity } }) => acc + quantity, 0);
};
