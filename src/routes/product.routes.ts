import { Router } from 'express';

import { ProductController } from '../controllers';
import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyRolePermissionMiddleware,
} from '../middlewares';
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
