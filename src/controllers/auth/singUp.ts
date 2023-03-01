import User from '@/models/userModel';
import { IApiResponse } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function signUp(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    const { project, email } = req.body;
    const createUser = User.create(req.body);
    if (!createUser)
        throw new AppError(
            500,
            `Internal server error. Can't create user: ${email}, project: ${project}`
        );
    else
        res.status(201).json({
            status: 'succes',
            message:
                'New project and user succesfully created. You may log in to your account.',
        });
}
