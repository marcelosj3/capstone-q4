import { boolean, number, object, string } from 'yup';

export const serializedProductSchema = object().shape({
  productId: string().uuid(),
  name: string(),
  brand: string(),
  category: string(),
  description: string().nullable().notRequired(),
  expiryDate: string().nullable().notRequired(),
  //TODO: componentizar o stock e o supplier para utilizar mais facilmente em outros lugares
  stock: object().shape({
    stockId: string().uuid(),
    increaseValuePercentage: number(),
    isAvailable: boolean(),
    unityValueToSell: number(),
    supplier: object().shape({
      supplierId: string().uuid(),
      name: string(),
      cnpj: string(),
      unityValue: number(),
    }),
  }),
});
