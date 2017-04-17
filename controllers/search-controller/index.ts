import { Router } from 'express';
import { SearchController } from './search.controller';

export const searchRouter = Router();
const ctrl = new SearchController();
searchRouter.get('/:searchParam', ctrl.get);