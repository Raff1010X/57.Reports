import { Codes } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { nextAuthOptions, CustomSession } from '@/pages/api/auth/[...nextauth]';

const protectSuperUserRoute = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    const session = await getServerSession(req, res, nextAuthOptions) as CustomSession | null;
    const role = session?.user?.role;
    if (!session || role !== 'user') {
        throw new AppError(Codes.Unauthorized, 'You are not authorized to access this route');
    }

    return next(req, res);
};

export default protectSuperUserRoute;