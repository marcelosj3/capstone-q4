import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Cart, CartProduct } from '../entities';
import { AppError } from '../errors';
import { IInsertToCart } from '../interfaces';
import {
  CartProductsRepository,
  CartRepository,
  ProductRepository,
  UserRepository,
} from '../repositories';
import {
  cartToSerialize,
  reduceCartTotalPrice,
  shippingFeeCalculator,
} from '../utils';

class CartService {
  insertProduct = async ({ validated, decoded }: Request) => {
    const { quantity, productId } = validated as IInsertToCart;
    const { id } = decoded;

    const user = await UserRepository.findOneWithCart({ userId: id });

    if (!user) throw new AppError({ error: 'user not found' }, 404);

    const userCart = user.cart.find((cart) => cart.isPaid == false) as Cart;

    const product = await ProductRepository.findOneWithStock({ productId });

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
      // Cart already exists
      cart = userCart;

      const productIndex = cart.cartProducts.findIndex(
        ({ product: { productId } }) => productId == product.productId
      );

      if (productIndex !== -1) {
        // Product already exists on cart

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
        // Product does not exists on cart

        const cartProductInfo = { product, quantity };

        cartProduct = CartProductsRepository.create(cartProductInfo);
        cartProduct.cart = cart;
        cart.cartProducts.push(cartProduct);

        cartProduct = await CartProductsRepository.save(cartProduct);
      }
    } else {
      // An isPaid = false cart does not exists

      cart = await AppDataSource.transaction(async (entityManager) => {
        const cartProductInfo = { product, quantity, cart: {} as Cart };

        cartProduct = entityManager.create(CartProduct, cartProductInfo);

        const cartInfo = entityManager.create(Cart, {});
        cartInfo.totalPrice = product.stock.unityValueToSell * quantity;
        cartInfo.cartProducts = [cartProduct];
        cartInfo.user = user;

        cart = await entityManager.save(Cart, cartInfo);

        cartProduct.cart = cart;

        cartProduct = await entityManager.save(CartProduct, cartProduct);

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

  pay = async ({ decoded }: Request) => {
    const { id } = decoded;

    const user = await UserRepository.findOneWithCart({ userId: id });

    if (!user) throw new AppError({ error: 'user not found' }, 404);

    console.log(user);

    return { statusCode: 200, message: {} };
  };
}

export default new CartService();
