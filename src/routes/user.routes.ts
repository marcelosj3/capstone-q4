import { Router } from 'express';

import { UserController } from '../controllers';
import {
  getUserByIdOr404Middleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyForKeyInBodyAndValidateToken,
  verifyRoleMiddleware,
  verifyRolePermissionMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../schemas';
import { CompanyRole } from '../types';

const router: Router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    verifyForKeyInBodyAndValidateToken(['companyRole']),
    verifyRolePermissionMiddleware,
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

  router.patch(
    '/me',
    validateSchemaMiddleware(updateUserSchema),
    verifyUserExistsMiddleware,
    validateTokenMiddleware,
    verifyRolePermissionMiddleware,
    UserController.patch
  );

  router.delete(
    '/:uuid',
    validateTokenMiddleware,
    getUserByIdOr404Middleware,
    UserController.delete
  );

  return router;
};
