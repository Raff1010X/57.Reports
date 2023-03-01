import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export default async function corsMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    return next(req, res);
}