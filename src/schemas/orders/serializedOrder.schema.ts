import { array, number, object, string } from 'yup';

import { serializedProductSchema } from '../products';

export const serializedOrderSchema = object().shape({
  orderId: string().required(),
  cartId: string().uuid(),
  totalPrice: number(),
  shippingFee: number(),
  products: array().of(serializedProductSchema),
});
