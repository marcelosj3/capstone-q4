import express from 'express';
import 'express-async-errors';

import { errorMiddleware } from './middlewares';
import { appRoutes } from './routes';

export const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);
