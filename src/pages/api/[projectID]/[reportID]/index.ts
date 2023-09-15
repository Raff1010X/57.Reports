// Note: This file is used to handle all requests to /api/report/*

import { reportController } from '@/controllers/reportController';
import { pageController } from '@/controllers/pageController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import protectRoute from '@/middlewares/defaultMiddlewares/protectRoute';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.get(protectRoute('user', true), reportController.get);
router.post(protectRoute('superUser'), pageController.create);
router.put(protectRoute('superUser'), reportController.update);
router.delete(protectRoute('superUser'), reportController.delete);


export default router.handler(errHandler);