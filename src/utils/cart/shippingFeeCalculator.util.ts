import { Cart } from '../../entities';

export const shippingFeeCalculator = (cart: Cart): number => {
  const { totalPrice } = cart;

  return totalPrice < 50
    ? 80
    : totalPrice < 150
    ? 60
    : totalPrice <= 250
    ? 20
    : 0;
};
