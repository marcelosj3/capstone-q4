import { Express, Router } from 'express';

import { userRoutes } from './user.routes';

const router = Router();

const apiRouter = (): Router => {
  router.use('/users', userRoutes());

  return router;
};

export const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};
