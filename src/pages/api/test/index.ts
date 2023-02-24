import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGet } from '@/controllers/test/testController';
import { handlerError } from '@/errors/handlerError';
import mongoDbMiddleware from '@/db/db';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(mongoDbMiddleware).use(testMiddleware).get(testGet);

export default router.handler(handlerError);
