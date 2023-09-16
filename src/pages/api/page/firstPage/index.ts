// Note: This file is used to handle all requests to /api/page/firstPage/*

import { firstPageController } from '@/controllers/firstPageController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import protectRoute from '@/middlewares/defaultMiddlewares/protectRoute';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router
    .get(protectRoute('user', true), firstPageController.get)
    .post(protectRoute('superUser'), firstPageController.create)
    .put(protectRoute('superUser'), firstPageController.update);

export default router.handler(errHandler);
