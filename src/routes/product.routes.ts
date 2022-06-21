import { Router } from 'express';

import { ProductController } from '../controllers';
import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
} from '../middlewares';
import { verifyRolePermissionMiddleware } from '../middlewares/users/verifyRolePermission.middleware';
import { createProductSchema } from '../schemas';

const router: Router = Router();

export const productRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createProductSchema),
    validateTokenMiddleware,
    verifyRolePermissionMiddleware,
    ProductController.create
  );
  return router;
};
