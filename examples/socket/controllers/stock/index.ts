import { Router } from 'express';
import { StockController } from './stock.controller';

export const stockRouter = Router();
const ctrl = new StockController();

stockRouter.get('/:stockName', ctrl.kushkush);

