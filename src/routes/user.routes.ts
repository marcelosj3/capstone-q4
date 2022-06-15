import { Router } from 'express';

import { UserController } from '../controllers';
import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import { createUserSchema, loginUserSchema } from '../schemas';

const router: Router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createUserSchema),
    verifyUserExistsMiddleware,
    UserController.create
  );

  router.post(
    '/login',
    validateSchemaMiddleware(loginUserSchema),
    UserController.login
  );

  router.get('', validateTokenMiddleware, UserController.getAll);

  return router;
};
