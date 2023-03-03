import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import existingProject from '@/middlewares/auth/existingProject';
import signUp from '@/controllers/auth/singUp';
import checkPassword from '@/middlewares/auth/checkPassword';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.use(existingProject);
router.use(checkPassword);
router.post(signUp);

export default router.handler(errHandler);