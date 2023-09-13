import { Codes } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import { getSession } from 'next-auth/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const protectSuperUserRoute = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    const session = await getSession({ req }) as any;
    const role = session?.user?.role;
    if (!session || role !== 'superUser') {
        throw new AppError(Codes.Unauthorized, 'You are not authorized to access this route');
    }
    
    return next(req, res);
};

export default protectSuperUserRoute;