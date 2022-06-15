import { Router } from 'express';

import {
  validateSchemaMiddleware,
  verifyUserExistsMiddleware,
} from '../middlewares';
import { createUserSchema } from '../schemas';

export const router: Router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createUserSchema),
    verifyUserExistsMiddleware
  );

  return router;
};
