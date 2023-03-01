import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGetById } from '@/controllers/test/testController';
import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/defaultMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.use(testMiddleware);
router.get(testGetById);

export default router.handler(errHandler);
