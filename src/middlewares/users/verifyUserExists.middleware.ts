import { NextFunction, Request, Response } from 'express';

import { User } from '../../entities';
import { AppError } from '../../errors';
import { UserRepository } from '../../repositories';

export const verifyUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail = req.validated.email;
  const userCpf = req.validated.cpf;

  if (userEmail) {
    const foundUserEmail: User | null = await UserRepository.findOne({
      email: userEmail,
    });

    if (foundUserEmail) {
      throw new AppError({ error: 'email already exists' }, 409);
    }
  }

  if (userCpf) {
    const foundUserCpf: User | null = await UserRepository.findOne({
      cpf: (req.validated as unknown as User).cpf,
    });

    if (foundUserCpf) {
      throw new AppError({ error: 'CPF already exists' }, 409);
    }
  }

  return next();
};
