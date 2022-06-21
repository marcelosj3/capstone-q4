import { Router } from 'express';

import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
} from '../middlewares';
import { verifyRolePermissionMiddleware } from '../middlewares/users/verifyRolePermission.middleware';
import { createProductSchema } from '../schemas';
import { ProductService } from '../services';

const router: Router = Router();

export const productRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createProductSchema),
    validateTokenMiddleware,
    verifyRolePermissionMiddleware,
    ProductService.create
  );
  return router;
};
