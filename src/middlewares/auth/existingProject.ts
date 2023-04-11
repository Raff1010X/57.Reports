import SuperUser from '@/models/superUserModel';
import { Codes } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const existingProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const { project } = req.body;
    const existingProject = await SuperUser.findOne({ project });
    if (existingProject)
        throw new AppError(
            Codes.Conflict,
            `Project already exists! Change name of project.`
        );

    return next(req, res);
};

export default existingProject;
