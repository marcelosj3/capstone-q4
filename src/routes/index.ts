import { Express, Router } from 'express';

import { cartRoutes } from './cart.routes';
import { productRoutes } from './product.routes';
import { userRoutes } from './user.routes';

const router: Router = Router();

const apiRouter = (): Router => {
  router.use('/cart', cartRoutes());
  router.use('/products', productRoutes());
  router.use('/users', userRoutes());

  return router;
};

export const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};
