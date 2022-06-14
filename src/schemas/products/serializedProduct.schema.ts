import { boolean, number, object, string } from 'yup';

export const serializedCreatedProductSchema = object().shape({
  productId: string().uuid().required(),
  name: string().required(),
  brand: string().required(),
  category: string().required(),
  description: string().nullable().notRequired(),
  expiryDate: string().nullable().notRequired(),
  //TODO: componentizar o stock e o supplier para utilizar mais facilmente em outros lugares
  stock: object()
    .shape({
      stockId: string().uuid().required(),
      increaseValuePercentage: number().required(),
      isAvailable: boolean().required(),
      unityValueToSell: number().required(),
      supplier: object()
        .shape({
          supplierId: string().uuid().required(),
          name: string().required(),
          cnpj: string().required(),
          unityValue: number().required(),
        })
        .required(),
    })
    .required(),
});
