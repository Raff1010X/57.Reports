import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import mongoDbConnect from '@/utils/mongoDbConnect';
import AppError from '@/utils/appError';
import { Codes } from '@/types/apiResponse';

const mongoDbMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    await mongoDbConnect();
    return next(req, res);
};

export default mongoDbMiddleware;
