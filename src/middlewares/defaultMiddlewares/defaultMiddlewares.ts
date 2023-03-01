import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeRouter } from 'next-connect/dist/types/node';
import mongoDb from './mongoDbMiddleware';
import mongoSanitize from './mongoSanitize';
import corsMiddleware from './corsMiddleware';
import helmetMiddleware from './helmetMiddleware';
import xssHppMiddleware from './xssHppMiddleware';
import rateMiddleware from './rateLimitMiddleware';

function addDefaultMiddlewares(router: NodeRouter<NextApiRequest, NextApiResponse>) : NodeRouter<NextApiRequest, NextApiResponse> {
    router.use(rateMiddleware);
    router.use(xssHppMiddleware);
    router.use(mongoSanitize);
    router.use(mongoDb);
    router.use(helmetMiddleware);
    router.use(corsMiddleware);

    return router
}

export default addDefaultMiddlewares
