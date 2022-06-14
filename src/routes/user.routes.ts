import { Router } from 'express';

import { UserController } from '../controllers/';
import { validateSchemaMiddleware } from '../middlewares';
import { createUserSchema } from '../schemas';

const router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createUserSchema),
    UserController.create
  );

  return router;
};
