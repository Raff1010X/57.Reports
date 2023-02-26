import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGetById } from '@/controllers/test/testController';
import errHandler from '@/middlewares/errorHandlerMiddleware';
import createRouter from '@/middlewares/defaultMiddlewares/defaultMiddlewares';

const router = createRouter();

router.use(testMiddleware).get(testGetById);

export default router.handler(errHandler);
