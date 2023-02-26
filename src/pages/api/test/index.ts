import { testMiddleware } from '@/middlewares/testMiddleware';
import { testGet } from '@/controllers/test/testController';
import errHandler from '@/middlewares/errorHandlerMiddleware';
import createRouter from '@/middlewares/defaultMiddlewares/defaultMiddlewares';

const router = createRouter();

router.use(testMiddleware).get(testGet);

export default router.handler(errHandler);
