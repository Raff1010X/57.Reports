import { Codes } from '@/types/apiResponse';
import AppError from '@/utils/appError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const checkPassword = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const { password } = req.body;
    if (password.length < 8 || password.length > 50) {
        throw new AppError(
            Codes.BadRequest,
            'Password should be between 8 and 50 characters long'
        );
    }
    return next(req, res);
};

export default checkPassword;
