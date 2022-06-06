import express from 'express';
import 'express-async-errors';
import registerRouters from './routes';

const app = express();

app.use(express.json());
registerRouters(app);

export default app;
