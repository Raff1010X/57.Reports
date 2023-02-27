import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import AppError from '@/utils/appError';
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
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