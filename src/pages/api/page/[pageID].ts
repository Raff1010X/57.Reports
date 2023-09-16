// Note: This file is used to handle all requests to /api/page/*

import { pageController } from '@/controllers/pageController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import protectRoute from '@/middlewares/defaultMiddlewares/protectRoute';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router
    .get(protectRoute('user', true), pageController.get)
    .put(protectRoute('superUser', true), pageController.update)
    .delete(protectRoute('superUser', true), pageController.delete);

export default router.handler(errHandler);