import { Cart } from '../../entities';
import { serializedCartSchema } from '../../schemas/cart';

export const cartToSerialize = async (cart: Cart) =>
  await serializedCartSchema.validate(
    {
      ...cart,
      cartProducts: undefined,
      user: undefined,
      products: cart.cartProducts.map((cartProduct) => ({
        productId: cartProduct.product.productId,
        name: cartProduct.product.name,
        brand: cartProduct.product.brand,
        category: cartProduct.product.category,
        description: cartProduct.product.description,
        quantity: cartProduct.quantity,
        unityValue: cartProduct.product.stock.unityValueToSell,
      })),
    },
    {
      stripUnknown: true,
    }
  );
