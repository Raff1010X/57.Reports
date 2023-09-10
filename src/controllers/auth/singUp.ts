import SuperUser from '@/models/superUserModel';
import bcrypt from 'bcryptjs';
import { Codes, IApiResponse } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '@/utils/sendEmail';
import Project from '@/models/projectModel';

export default async function signUp(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    const { project, email } = req.body;
    const activator = bcrypt.hashSync(Date.now().toString(), 10);

    const createProject = await Project.create({ name: project });
    if (!createProject)
        throw new AppError(
            Codes.InternalServerError,
            `Internal server error. Can't create project: ${project}`
        );
    req.body.project = createProject.id;

    const createUser = await SuperUser.create({ ...req.body, activator });
    if (!createUser)
        throw new AppError(
            Codes.InternalServerError,
            `Internal server error. Can't create user: ${email}`
        );

    const emailSend = await sendEmail(email, 'activateAccount', encodeURIComponent(activator));
    if (!emailSend)
        throw new AppError(
            Codes.InternalServerError,
            `Internal server error. Can't send account activation email.`
        );

    res.status(Codes.Created).json({
        status: 'success',
        message:
            'Thank you for registering with our service. Your account will be activated when you click the link sent to your email.',
    });
}
