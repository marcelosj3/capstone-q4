import { Router } from 'express';

import { CartController } from '../controllers';
import {
  validateSchemaMiddleware,
  validateTokenMiddleware,
} from '../middlewares';
import { insertToCartSchema } from '../schemas';

const router: Router = Router();

export const cartRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(insertToCartSchema),
    validateTokenMiddleware,
    CartController.insertProduct
  );

  return router;
};
