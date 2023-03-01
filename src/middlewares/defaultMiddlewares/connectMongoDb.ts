import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import mongoDbConnect from '@/utils/mongoDbConnect';

const mongoDbMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    await mongoDbConnect();
    return next(req, res);
};

export default mongoDbMiddleware;
