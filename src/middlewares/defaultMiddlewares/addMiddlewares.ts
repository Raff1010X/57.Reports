import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeRouter } from 'next-connect/dist/types/node';
import mongoDb from './connectMongoDb';
import mongoSanitize from './mongoSanitize';
import corsMiddleware from './cors';
import helmetMiddleware from './helmet';
import xssHppMiddleware from './xssHpp';
import rateMiddleware from './rateLimit';
import protectSuperUserRoute from './protectSuperUserRoute';

function addDefaultMiddlewares(router: NodeRouter<NextApiRequest, NextApiResponse>) : NodeRouter<NextApiRequest, NextApiResponse> {
    router.use(rateMiddleware);
    router.use(xssHppMiddleware);
    router.use(mongoSanitize);
    router.use(mongoDb);
    router.use(helmetMiddleware);
    router.use(corsMiddleware);
    
    router.use(protectSuperUserRoute);// TODO: remove this middleware

    return router
}

export default addDefaultMiddlewares
