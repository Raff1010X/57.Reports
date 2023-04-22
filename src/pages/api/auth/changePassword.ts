import errHandler from '@/middlewares/errorHandlerMiddleware';
import addDefaultMiddlewares from '@/middlewares/defaultMiddlewares/addMiddlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import checkPassword from '@/middlewares/auth/checkPassword';
import changePassword from '@/controllers/auth/changePassword';

const router = createRouter<NextApiRequest, NextApiResponse>();
addDefaultMiddlewares(router);
router.use(checkPassword);
router.post(changePassword);

export default router.handler(errHandler);