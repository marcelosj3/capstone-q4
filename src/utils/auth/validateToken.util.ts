import { Request } from 'express';
import { decode, verify } from 'jsonwebtoken';

import { AppError } from '../../errors';

export const validateToken = (req: Request): void => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError({ error: 'Missing authorization token' }, 401);
  }

  verify(token, String(process.env.SECRET_KEY), (error) => {
    if (error) {
      throw new AppError({ error: error.message }, 401);
    }
  });

  req.decoded = decode(token);
};
