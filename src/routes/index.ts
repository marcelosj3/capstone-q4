import { Express, Router } from 'express';

import { router, userRoutes } from './user.routes';

const apiRouter = (): Router => {
  router.use('/users', userRoutes());

  return router;
};

export const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};
