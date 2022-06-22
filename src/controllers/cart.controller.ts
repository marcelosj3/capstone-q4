import { Request, Response } from 'express';

import { CartService } from '../services';

class CartController {
  insertProduct = async (req: Request, res: Response) => {
    const { statusCode, message } = await CartService.insertProduct(req);
    return res.status(statusCode).json(message);
  };

  pay = async (req: Request, res: Response) => {
    const { statusCode, message } = await CartService.pay(req);
    return res.status(statusCode).json(message);
  };
}

export default new CartController();
