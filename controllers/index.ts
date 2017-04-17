import { Router } from 'express';
import { searchRouter } from './search-controller';

export const apiRouter = Router();
apiRouter.use('/search', searchRouter);

