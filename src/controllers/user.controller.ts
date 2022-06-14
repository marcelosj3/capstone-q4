import { Request, Response } from 'express';

import { UserService } from '../services';

class UserController {
  create = async (req: Request, res: Response) => {
    const { statusCode, message } = await UserService.create(req);
    return res.status(statusCode).json(message);
  };
}

export default new UserController();
