import { Order } from '../../entities';
import { serializedOrderSchema } from '../../schemas';

export const orderToSerialize = async (
  order: Order,
  withProducts: boolean = false
) =>
  await serializedOrderSchema.validate(
    {
      orderId: order.orderId,
      cartId: order.cart.cartId,
      totalPrice: order.cart.totalPrice,
      shippingFee: order.cart.shippingFee,
      products: withProducts
        ? order.cart.cartProducts.length
        : order.cart.cartProducts.map(({ quantity, product }) => ({
            ...product,
            stock: undefined,
            onSale: undefined,
            unityValue: product.stock.unityValueToSell,
            quantity: quantity,
          })),
    },
    {
      stripUnknown: true,
    }
  );
