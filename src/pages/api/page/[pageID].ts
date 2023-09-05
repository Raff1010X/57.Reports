// Note: This file is used to handle all requests to /api/page/*

import { pageController } from '@/controllers/pageController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.get(pageController.get);
router.put(pageController.update);
router.delete(pageController.delete);

export default router.handler(errHandler);