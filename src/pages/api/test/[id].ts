import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGetById } from '@/controllers/test/testController';
import { handlerError } from '@/errors/handlerError';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(testMiddleware).get(testGetById);

export default router.handler(handlerError);
