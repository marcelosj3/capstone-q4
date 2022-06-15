import { Router } from 'express';

import { UserController } from '../controllers/';
import {
  validateSchemaMiddleware,
  validateSchemaMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import { createUserSchema } from '../schemas';

const router: Router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createUserSchema),
    verifyUserExistsMiddleware,
    UserController.create
  );

  return router;
};
