import { array, boolean, number, object, string } from 'yup';

import { serializedProductSchema } from '../products';

export const serializedCartSchema = object().shape({
  cartId: string().uuid(),
  isPaid: boolean(),
  totalPrice: number(),
  shippingFee: number(),
  products: array().of(serializedProductSchema),
});
