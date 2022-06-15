import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

import { AppError } from '../errors';

export const validateSchemaMiddleware =
  (shape: AnySchema) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validated = validated;

      return next();
    } catch (error: any) {
      console.log('='.repeat(50));
      console.log();
      console.log(error);
      console.log();
      console.log('='.repeat(50));

      throw new AppError(error.message, 400);
    }
  };
