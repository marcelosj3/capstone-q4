import { NextFunction, Request, Response } from 'express';

import { validateToken } from '../utils/auth/validateToken.util';

export const validateTokenMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  validateToken(req);

  return next();
};
