import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', router);

// Example controller
const test = (_req: Request, res: Response) => {
  const a = 10;
  res.send({ value: a });
};

app.get('/', test);

// Error-handling middleware
app.use(notFound);
// Not Found

export default app;
