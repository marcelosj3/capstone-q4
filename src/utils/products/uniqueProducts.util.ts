import { Product } from '../../entities';

export const uniqueProductsUtil = (payload: Array<Product>) => {
  const toUniqueProducts = payload.map(
    ({ name, brand, category, expiryDate }) => {
      return `${name}-${brand}-${category}-${expiryDate}`;
    }
  );

  return [...new Set(toUniqueProducts)];
};
