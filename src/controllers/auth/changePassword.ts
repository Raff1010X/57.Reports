import SuperUser from '@/models/superUserModel';
import bcrypt from 'bcryptjs';
import { Codes, IApiResponse } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '@/utils/sendEmail';
import User from '@/models/userModel';

export default async function changePassword(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    const { password, email } = req.body;
    const activator = bcrypt.hashSync(Date.now().toString(), 10);

    const updateSuperUser = await SuperUser.updateMany(
        { email },
        { activator }
    );
    const updateUser = await User.updateMany({ email }, { activator });
    if (!updateSuperUser && !updateUser)
        throw new AppError(
            Codes.InternalServerError,
            `Internal server error. Can't change password for user ${email}`
        );

    const superUserProjects = await SuperUser.find({ email });
    const userProjects = await User.find({ email });
    const projects = [...superUserProjects, ...userProjects]
        .map((el, index) => {
            return `<br>${index + 1}: ${el.project}`;
        })
        .toString();

    const passwordHash = bcrypt.hashSync(password, 10);

    const emailSend = await sendEmail(
        email,
        'changePassword',
        encodeURIComponent(activator),
        projects,
        encodeURIComponent(passwordHash)
    );

    if (!emailSend)
        throw new AppError(
            Codes.InternalServerError,
            `Internal server error. Can't send new password activation email.`
        );

    res.status(Codes.OK).json({
        status: 'succes',
        message:
            'Your new password will be activated when you click the link sent to your email.',
    });
}