// Note: This file is used to handle all requests to /api/project/*

import { projectController } from '@/controllers/projectController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { reportController } from '@/controllers/reportController';
import protectRoute from '@/middlewares/defaultMiddlewares/protectRoute';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router
    .get(protectRoute('user', true), projectController.get)
    .post(protectRoute('superUser'), reportController.create)
    .put(protectRoute('superUser'), projectController.update)
    .delete(protectRoute('superUser'), projectController.delete);

export default router.handler(errHandler);