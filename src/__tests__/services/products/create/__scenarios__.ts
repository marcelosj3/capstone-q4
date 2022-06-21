import { Request } from 'express';

import { Product, Stock, Supplier } from '../../../../entities';

const seralizedProduct = {
  productId: '393be4d2-5ed8-4edf-8dbc-5598e813d2b8',
  name: 'leite',
  brand: 'longa vida',
  category: 'laticinios',
  description: 'leite pasteurizado caixa 1000ml',
  expiryDate: '20/08/2022',
  onSale: false,
  stock: {
    stockId: '72b3026f-683b-4228-8544-564800e3ec9d',
    increaseValuePercentage: 30,
    isAvailable: true,
    quantity: 40,
    unityValueToSell: 2.6,
    supplier: {
      supplierId: '3d679bb9-e620-484b-8c23-278260a01aca',
      name: 'Fornecedora de leite',
      cnpj: '94.242.943/0001-74',
    },
  },
};

export const createProduct = {
  product: seralizedProduct as Product,
  stock: seralizedProduct.stock as Stock,
  supplier: seralizedProduct.stock.supplier as Supplier,
  payload: {
    validated: {
      name: 'leite',
      brand: 'longa vida',
      category: 'laticinios',
      description: 'leite pasteurizado caixa 1000ml',
      expiryDate: '20/08/2022',
      quantity: 40,
      unityValue: 2.0,
      supplier: {
        name: 'Fornecedora de leite',
        cnpj: '94.242.943/0001-74',
      },
    },
  } as Request,
  expected: {
    status: 201,
    message: seralizedProduct as Product,
  },
};
