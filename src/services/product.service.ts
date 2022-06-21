import { Request } from 'express';

import { Product } from '../entities';

class ProductService {
  create = async ({ validated }: Request) => {
    let product: Product;
    return {
      statusCode: 201,
      message: 'Hello',
    };
  };
}

export default new ProductService();
