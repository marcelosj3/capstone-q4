import { Express, Router } from 'express';

import { cartRoutes } from './cart.routes';
import { userRoutes } from './user.routes';

const router: Router = Router();

const apiRouter = (): Router => {
  router.use('/cart', cartRoutes());
  router.use('/users', userRoutes());

  return router;
};

export const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};
