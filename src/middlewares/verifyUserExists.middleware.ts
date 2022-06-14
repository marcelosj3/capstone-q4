import { NextFunction, Request, Response } from 'express';

import { User } from '../entities';
import { AppError } from '../errors';
import { UserRepository } from '../repositories';

export const verifyUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const foundUser: User | null = await UserRepository.findOne({
    email: (req.validated as unknown as User).email,
  });

  if (foundUser) {
    throw new AppError({ error: 'Email already exists' }, 409);
  }

  return next();
};
