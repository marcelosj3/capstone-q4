import { Request, Response } from 'express';

import { UserService } from '../services';

class UserController {
  create = async (req: Request, res: Response) => {
    const { statusCode, message } = await UserService.create(req);
    return res.status(statusCode).json(message);
  };

  login = async (req: Request, res: Response) => {
    const { statusCode, message } = await UserService.login(req);
    return res.status(statusCode).json(message);
  };

  getAll = async (_: Request, res: Response) => {
    const { statusCode, message } = await UserService.getAll();
    return res.status(statusCode).json(message);
  };

  patch = async (req: Request, res: Response) => {
    const { statusCode, message } = await UserService.patch(req);
    return res.status(statusCode).json(message);
  };

  delete = async (req: Request, res: Response) => {
    const { statusCode } = await UserService.delete(req);
    return res.status(statusCode).send();
  };

  orders = async (req: Request, res: Response) => {
    const { statusCode, message } = await UserService.orders(req);
    return res.status(statusCode).json(message);
  };
}

export default new UserController();
