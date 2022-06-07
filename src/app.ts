import express from 'express';
import 'express-async-errors';

import { errorMiddleware } from './middlewares';
import { registerRouters } from './routes';

export const app = express();

app.use(express.json());
registerRouters(app);

app.use(errorMiddleware);
