import { NextFunction, Request, Response } from 'express';

import { User } from '../entities';
import { AppError } from '../errors';
import { UserRepository } from '../repositories';

export const getUserByIdOr404Middleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const { uuid } = req.params;

  const user = await UserRepository.findOne({ userId: uuid });

  if (!user) {
    throw new AppError({ error: 'User not found' }, 404);
  }

  req.user = user as User;

  return next();
};
