import { NextFunction, Request, Response } from 'express';

import { User } from '../../entities';
import { AppError } from '../../errors';
import { UserRepository } from '../../repositories';

export const verifyUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const foundUserEmail: User | null = await UserRepository.findOne({
    email: (req.validated as unknown as User).email,
  });

  if (foundUserEmail) {
    throw new AppError({ error: 'email already exists' }, 409);
  }

  const foundUserCpf: User | null = await UserRepository.findOne({
    cpf: (req.validated as unknown as User).cpf,
  });

  if (foundUserCpf) {
    throw new AppError({ error: 'CPF already exists' }, 409);
  }

  return next();
};
