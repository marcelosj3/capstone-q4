import { number, object, string } from 'yup';

export const insertToCartSchema = object().shape({
  productId: string().uuid().required(),
  quantity: number().required(),
});
