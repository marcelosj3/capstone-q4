import { Cart } from '../../entities';

export const reduceCartTotalPrice = (cart: Cart): number =>
  cart.cartProducts.reduce(
    (
      acc,
      {
        quantity,
        product: {
          stock: { unityValueToSell },
        },
      }
    ) => acc + quantity * unityValueToSell,
    0
  );
