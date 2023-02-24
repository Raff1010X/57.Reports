import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGet } from '@/controllers/test/testController';
import { handlerError } from '@/errors/handlerError';
import { NextResponse } from 'next/server';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(testMiddleware).get(testGet);

export default router.handler(handlerError);
