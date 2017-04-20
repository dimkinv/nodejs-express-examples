import { Router } from 'express';
import { stockRouter } from './stock';

export const controllersRouter = Router();
controllersRouter.use('/stock', stockRouter);
