import { Router } from 'express';

import { UserController } from '../controllers';
import {
  getUserByIdOr404Middleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyRoleMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import { createUserSchema, loginUserSchema } from '../schemas';
import { CompanyRole } from '../types';

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

  router.get(
    '',
    validateTokenMiddleware,
    verifyRoleMiddleware(CompanyRole.EMPLOYEE),
    UserController.getAll
  );

  router.delete(
    '/:uuid',
    validateTokenMiddleware,
    getUserByIdOr404Middleware,
    UserController.delete
  );

  return router;
};
