// Note: This file is used to handle all requests to /api/project/*

import { projectController } from '@/controllers/projectController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.get(projectController.get);
router.put(projectController.update);
router.delete(projectController.delete);

export default router.handler(errHandler);