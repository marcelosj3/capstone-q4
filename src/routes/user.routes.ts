import { Router } from 'express';

import { UserController } from '../controllers';
import {
  getUserByIdOr404Middleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyRoleMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import { verifyForKeyInBodyAndValidateToken } from '../middlewares/users/verifyForKeyInBodyAndValidateToken.middleware';
import { verifyRolePermissionMiddleware } from '../middlewares/users/verifyRolePermission.middleware';
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
    validateTokenMiddleware,
    getUserByIdOr404Middleware,
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
