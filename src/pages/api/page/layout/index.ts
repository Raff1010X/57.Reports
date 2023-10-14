// Note: This file is used to handle all requests to /api/page/layout/*

import { pageLayoutController } from '@/controllers/pageLayoutController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import protectRoute from '@/middlewares/defaultMiddlewares/protectRoute';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router
    .get(protectRoute('user', true), pageLayoutController.get)
    .post(protectRoute('superUser', true), pageLayoutController.create)
    .put(protectRoute('superUser', true), pageLayoutController.update);

export default router.handler(errHandler);


