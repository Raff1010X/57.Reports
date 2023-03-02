import { testGet2 } from '@/controllers/test/testController';
import errHandler from '@/middlewares/errorHandlerMiddleware';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
router.get(testGet2);

export default router.handler(errHandler);