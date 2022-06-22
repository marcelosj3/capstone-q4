import { array, lazy, number, object, string } from 'yup';

import { serializedProductSchema } from '../products';

export const serializedOrderSchema = object().shape({
  orderId: string().required(),
  cartId: string().uuid(),
  totalPrice: number(),
  shippingFee: number(),
  uniqueProducts: number().optional(),
  products: lazy((value) => {
    if (Number.isFinite(value)) return number();
    return array().of(serializedProductSchema);
  }),
});
