import { NextFunction, Request, Response } from 'express';

import { User } from '../entities';
import { AppError } from '../errors';
import userRepository from '../repositories/user.repository';

export const verifyUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const foundUser: User | null = await userRepository.findOne({
    email: (req.validated as User).email,
  });

  if (foundUser) {
    throw new AppError('Email already exists', 409);
  }

  return next();
};
