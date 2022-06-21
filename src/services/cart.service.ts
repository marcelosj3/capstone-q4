import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Cart, CartProduct, Product } from '../entities';
import { AppError } from '../errors';
import { IInsertToCart } from '../interfaces';
import {
  CartProductsRepository,
  CartRepository,
  UserRepository,
} from '../repositories';
// TODO check why those imports doesn't work when exporting from utils
import { cartToSerialize } from '../utils/cart/cartToSerialize.util';
import { reduceCartTotalPrice } from '../utils/cart/reduceCartTotalPrice.util';
import { shippingFeeCalculator } from '../utils/cart/shippingFeeCalculator.util';

class CartService {
  insertProduct = async ({ validated, decoded }: Request) => {
    const { quantity, productId } = validated as IInsertToCart;
    const { id } = decoded;

    const user = await UserRepository.findOneWithCart({ userId: id });

    if (!user) throw new AppError({ error: 'user not found' }, 404);

    const userCart = user.cart.find((cart) => cart.isPaid == false) as Cart;

    // TODO change for the ProductRepository once we have it
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { productId: productId },
      relations: ['stock', 'stock.supplier'],
    });

    if (!product) throw new AppError({ error: 'product not found' }, 404);
    const productQuantity = product.stock.quantity;

    if (quantity > productQuantity)
      throw new AppError(
        {
          error: `out of stock, there are ${productQuantity} in stock and you are trying to add ${quantity}`,
        },
        401
      );

    let cart: Cart;
    let cartProduct: CartProduct;

    if (userCart) {
      cart = userCart;

      const productIndex = cart.cartProducts.findIndex(
        ({ product: { productId } }) => productId == product.productId
      );

      if (productIndex !== -1) {
        const cartProduct = cart.cartProducts[productIndex];

        if (quantity === 0) {
          const cartProduct: CartProduct = cart.cartProducts.splice(
            productIndex,
            1
          )[0];

          await CartProductsRepository.delete(
            String(cartProduct.cartProductsId)
          );
        } else {
          cartProduct.quantity = quantity;

          await CartProductsRepository.update(
            String(cartProduct.cartProductsId),
            cartProduct
          );
        }
      } else {
        const cartProductInfo = { product, quantity };

        cartProduct = CartProductsRepository.create(cartProductInfo);
        cartProduct.cart = cart;
        cart.cartProducts.push(cartProduct);

        cartProduct = await CartProductsRepository.save(cartProduct);
      }
    } else {
      cart = await AppDataSource.transaction(async (entityManager) => {
        const cartProductInfo = { product, quantity };

        cartProduct = CartProductsRepository.create(cartProductInfo);

        const cartInfo = CartRepository.create({});
        cartInfo.totalPrice = product.stock.unityValueToSell * quantity;
        cartInfo.cartProducts = [cartProduct];
        cartInfo.shippingFee = 10;
        cartInfo.user = user;

        cart = await CartRepository.save(cartInfo);

        cartProduct.cart = cart;

        cartProduct = await CartProductsRepository.save(cartProduct);

        return cart;
      });
    }

    cart.totalPrice = reduceCartTotalPrice(cart);
    cart.shippingFee = shippingFeeCalculator(cart);

    CartRepository.update(String(cart.cartId), {
      totalPrice: cart.totalPrice,
      shippingFee: cart.shippingFee,
    });

    const serializedCart = await cartToSerialize(cart);

    return { statusCode: 200, message: serializedCart };
  };
}

export default new CartService();
