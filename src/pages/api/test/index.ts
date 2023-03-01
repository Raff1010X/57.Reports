import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGet } from '@/controllers/test/testController';
import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/defaultMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.use(testMiddleware);
router.get(testGet);

export default router.handler(errHandler);
