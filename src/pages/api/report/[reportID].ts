// Note: This file is used to handle all requests to /api/report/*

import { reportController } from '@/controllers/reportController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { pageController } from '@/controllers/pageController';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.get(reportController.get);
router.post(pageController.create);
router.put(reportController.update);
router.delete(reportController.delete);

export default router.handler(errHandler);