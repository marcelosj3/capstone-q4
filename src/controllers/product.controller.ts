import { Request, Response } from 'express';

import { ProductService } from '../services';

class ProductController {
  create = async (req: Request, res: Response) => {
    const { statusCode, message } = await ProductService.create(req);
    return res.status(statusCode).json(message);
  };
  get = async (req: Request, res: Response) => {
    const { statusCode, message } = await ProductService.get(req);
    return res.status(statusCode).json(message);
  };
}

export default new ProductController();
