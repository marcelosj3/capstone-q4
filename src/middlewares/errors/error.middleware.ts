import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../errors';

export const errorMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
