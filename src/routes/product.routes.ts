import { Router } from 'express';

import { ProductController } from '../controllers';
import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
  verifyRoleMiddleware,
} from '../middlewares';
import { createProductSchema } from '../schemas';
import { CompanyRole } from '../types';

const router: Router = Router();

export const productRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createProductSchema),
    validateTokenMiddleware,
    verifyRoleMiddleware(CompanyRole.MANAGER),
    ProductController.create
  );
  router.get('', validateTokenMiddleware, ProductController.get);
  return router;
};
