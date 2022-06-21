import { boolean, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';
import { employeeProductStockSchema } from '../stocks';

export const productToEmployeeSerializerSchema = object().shape({
  productId: string().uuid().required(),
  name: string().lowercase().required(),
  brand: string().lowercase().required(),
  category: string().lowercase().required(),
  description: string().lowercase().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  onSale: boolean().default(false).optional(),
  stock: employeeProductStockSchema.required(),
});
