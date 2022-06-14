import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

export const validateSchemaMiddleware =
  (shape: AnySchema) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const validated = await shape.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    req.validated = validated;

    return next();
  };
