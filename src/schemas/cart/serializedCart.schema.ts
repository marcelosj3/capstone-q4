import { array, boolean, number, object, string } from 'yup';

export const serializedCartSchema = object().shape({
  cartId: string().uuid(),
  isPaid: boolean(),
  totalPrice: number(),
  shippingFee: number(),
  products: array().of(
    object().shape({
      productId: string().uuid(),
      name: string(),
      brand: string(),
      category: string(),
      description: string(),
      quantity: number().integer(),
      unityValueToSell: number(),
    })
  ),
});
