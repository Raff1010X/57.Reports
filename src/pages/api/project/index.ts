// Note: This file is used to handle all requests to /api/project/*

import { projectController } from '@/controllers/projectController';

import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.get(projectController.getProject);
router.post(projectController.createProject);

export default router.handler(errHandler);