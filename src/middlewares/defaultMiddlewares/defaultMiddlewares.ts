import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { NodeRouter } from 'next-connect/dist/types/node';
import mongoDb from './mongoDbMiddleware';
import mongoSanitize from './mongoSanitize';

const router = createRouter<NextApiRequest, NextApiResponse>();

function createRouterWithMiddlewares() : NodeRouter<NextApiRequest, NextApiResponse> {
    router.use(mongoDb);
    router.use(mongoSanitize);
    
    return router
}

export default createRouterWithMiddlewares
