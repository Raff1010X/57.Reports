import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import checkProject from '@/middlewares/auth/checkProject';
import checkUser from '@/middlewares/auth/checkUser';
import signUp from '@/controllers/auth/singUp';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.use(checkProject);
router.use(checkUser);
router.post(signUp);

export default router.handler(errHandler);