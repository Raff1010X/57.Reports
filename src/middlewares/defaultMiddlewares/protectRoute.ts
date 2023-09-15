import { Codes } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { nextAuthOptions, CustomSession } from '@/pages/api/auth/[...nextauth]';
import SuperUser from '@/models/superUserModel';
import User from '@/models/userModel';

export type Roles = 'user' | 'superUser' | 'admin';

export const protectionLevels: Record<string, string[]> = {
    user: ['superUser', 'admin', 'user'],
    superUser: ['superUser', 'admin'],
    admin: ['admin'],
};

const protectRoute = (level: Roles, protectProjects = false) => async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const roles = protectionLevels[level];
    const session = (await getServerSession(req, res, nextAuthOptions)) as CustomSession | null;
    const role = session?.user?.role;
    const email = session?.user?.email;
    let user;

    if (!session || !role || !roles.includes(role))
        throw new AppError(Codes.Unauthorized, 'You are not authorized to access this content');

    if (role === 'admin')
        return next(req, res);

    if (role === 'superUser')
        user = await SuperUser.find({ email });
    else
        user = await User.find({ email });

    if (!protectProjects)
        return next(req, res);

    const allProjects = user?.map((user) => user.project.toString());
    const project = req.query.projectId || req.body.project;

    if (!allProjects?.includes(project))
        throw new AppError(Codes.Unauthorized, 'You are not authorized to access this content');

    return next(req, res);

};

export default protectRoute;