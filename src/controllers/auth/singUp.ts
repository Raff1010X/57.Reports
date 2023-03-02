import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { IApiResponse } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function signUp(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    const { project, email } = req.body;
    const activator = bcrypt.hashSync(Date.now().toString(), 10);
    const createUser = User.create({...req.body, activator});

    // TODO: send email here

    if (!createUser)
        throw new AppError(
            500,
            `Internal server error. Can't create user: ${email}, project: ${project}`
        );
    else
        res.status(201).json({
            status: 'succes',
            message:
                'Thank you for registering with our service. Your account will be activated when you click the link sent to your email.',
        });
}

// TODO: create route to activate account
// Hi there,
// Thank you for registering with our service. Your account will be activated when you click the link below:
//                      domain${activator}
// We look forward to providing you with a great experience and hope that you enjoy using our services.
// Thanks again for signing up!
// Regards,
// PDF Report Team

// Congratulations! Your account has been successfully activated. You can now log into your account and start using it. Thank you for using our service.