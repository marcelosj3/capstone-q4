import { boolean, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';
import { serializedStockSchema } from '../stocks';

export const serializedEmployeeProductSchema = object().shape({
  productId: string().uuid(),
  name: string().lowercase(),
  brand: string().lowercase(),
  category: string().lowercase(),
  description: string().lowercase(),
  expiryDate: string().matches(
    expiryDateMatches.regex,
    expiryDateMatches.message
  ),
  onSale: boolean(),
  stock: serializedStockSchema,
});
