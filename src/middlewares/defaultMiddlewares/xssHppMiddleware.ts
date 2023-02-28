import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import AppError from '@/utils/appError';
const xss = require('xss-clean');
const hpp = require('hpp');

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                throw new AppError(500, 'XSS/HPP middleware error!');
            }
            return resolve(result);
        });
    });
}

export default async function xssHppMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) {
    await runMiddleware(req, res, xss());
    await runMiddleware(req, res, hpp());
    return next(req, res);
}
