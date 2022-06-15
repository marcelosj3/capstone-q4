import { Router } from 'express';

import { UserController } from '../controllers/';
import { validateSchemaMiddleware } from '../middlewares';
import { verifyUserExistsMiddleware } from '../middlewares/verifyUserExists.middleware';
import { createUserSchema } from '../schemas';

const router = Router();

export const userRoutes = (): Router => {
  router.post(
    '',
    validateSchemaMiddleware(createUserSchema),
    verifyUserExistsMiddleware,
    UserController.create
  );

  router.get('', UserController.getAll);

  return router;
};
