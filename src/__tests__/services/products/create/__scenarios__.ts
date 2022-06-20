import { Product } from '../../../../entities';

export const createProduct = {
  product: {
    productId: '393be4d2-5ed8-4edf-8dbc-5598e813d2b8',
    name: 'leite',
    brand: 'longa vida',
    category: 'laticinios',
    description: 'leite pasteurizado caixa 1000ml',
    expiryDate: '20/08/2022',
    onSale: false,
    stock: {
      stockId: 'stockId-uuid',
      increaseValuePercentage: 50,
      isAvailable: true,
      quantity: 40,
      unityValueToSell: 3.0,
      supplier: {
        supplierId: 'supplierId',
        name: 'Fornecedora de leite',
        cnpj: '94.242.943/0001-74',
      },
    },
  } as Product,
  payload: {
    validated: {
      name: 'leite',
      brand: 'longa vida',
      category: 'laticinios',
      description: 'leite pasteurizado caixa 1000ml',
      expiryDate: '20/08/2022',
      quantity: 40,
      supplier: {
        name: 'Fornecedora de leite',
        cnpj: '94.242.943/0001-74',
        unityValue: 2.0,
      },
    },
  },
  expected: {
    status: 201,
    message: {
      productId: '393be4d2-5ed8-4edf-8dbc-5598e813d2b8',
      name: 'leite',
      brand: 'longa vida',
      category: 'laticinios',
      description: 'leite pasteurizado caixa 1000ml',
      expiryDate: '20/08/2022',
      onSale: false,
      stock: {
        stockId: 'stockId-uuid',
        increaseValuePercentage: 50,
        isAvailable: true,
        quantity: 40,
        unityValueToSell: 3.0,
        supplier: {
          supplierId: 'supplierId',
          name: 'Fornecedora de leite',
          cnpj: '94.242.943/0001-74',
        },
      },
    } as Product,
  },
};
