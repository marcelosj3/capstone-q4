import { boolean, number, object, string } from 'yup';

import { expiryDateMatches } from '../../utils';

const employeeProductStockSchema = object().shape({
  stockId: string().uuid().required(),
  increaseValuePercentage: number().required(),
  isAvailable: boolean().required(),
  quantity: number().integer().required(),
  unityValueToSell: number().required(),
})

// "stock": {
//   "stockId": "stockId-uuid",
//   "increaseValuePercentage": 50,
//   "isAvailable": true,
//   "quantity": 40,
//   "unityValueToSell": 3.00,
//   "supplier": {
//       "supplierId": "supplierId",
//       "name":	"Fornecedora de leite",
//       "cnpj": "94.242.943/0001-74"
//   }
// }

export const productToEmployeeSerializerSchema = object().shape({
  productId: string().uuid().required(),
  name: string().lowercase().required(),
  brand: string().lowercase().required(),
  category: string().lowercase().required(),
  description: string().lowercase().notRequired(),
  expiryDate: string()
    .matches(expiryDateMatches.regex, expiryDateMatches.message)
    .notRequired(),
  quantity: number().integer().required(),
  unityValueToSell: number().required(),
  onSale: boolean().default(false).optional(),
});
