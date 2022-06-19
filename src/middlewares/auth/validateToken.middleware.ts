import { NextFunction, Request, Response } from 'express';

import { User } from '../../entities';
import { AppError } from '../../errors';
import { validateToken } from '../../utils/auth';

export const validateTokenMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  validateToken(req);

  return next();
};
