import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server'
import AppError from '@/utils/appError';
import { IApiResponse } from '@/types/apiResponse';
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: {status: 'fail', message: 'Too many requests from this IP, please try again in an hour!'} as IApiResponse,
    keyGenerator: (req: NextRequest, res: NextApiResponse) => req.ip,
});

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                throw new AppError(500, 'Rate Limit middleware error!');
            }
            return resolve(result);
        });
    });
}

export default async function rateMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) {
    await runMiddleware(req, res, limiter);
    return next(req, res);
}