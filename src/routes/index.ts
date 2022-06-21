import { Express, Router } from 'express';

import { productRoutes } from './product.routes';
import { userRoutes } from './user.routes';

const router: Router = Router();

const apiRouter = (): Router => {
  router.use('/users', userRoutes());
  router.use('/products', productRoutes());

  return router;
};

export const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};
