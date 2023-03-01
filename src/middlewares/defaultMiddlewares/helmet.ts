import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import AppError from '@/utils/appError';

const helmet = require("helmet");

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                throw new AppError(500, 'Helmet middleware error!');
            }
            return resolve(result);
        });
    });
}

export default async function helmetMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) {
    await runMiddleware(req, res, helmet());
    res.setHeader('Feature-Policy', 'microphone \'none\'; camera \'none\'');
    return next(req, res);
}
