import { IApiResponse } from '@/types/apiResponse';
import mongoose, { MongooseError } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import AppError from '@/utils/appError';

export const errorHandlerMiddleware = {
    onError: (
        err: unknown,
        req: NextApiRequest,
        res: NextApiResponse<IApiResponse>
    ) => {
        
        if (process.env.NODE_ENV === 'development') console.log(err);

        if (err instanceof AppError) {
            handleAppErrors(err, req, res);
            return;
        }
        if (err instanceof mongoose.Error) {
            handleMongooseErrors(err, req, res);
            return;
        }
        handleRestOfErrors(err, req, res);
    },

    onNoMatch: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) =>
        noMatchError(req, res),
};

function handleMongooseErrors(
    err: MongooseError,
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    res.status(400).json({
        status: 'error',
        message: err.message,
    });
}

function handleAppErrors(
    err: AppError,
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    res.status(err.status).json({
        status: 'error',
        message: err.message,
    });
}

function handleRestOfErrors(
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}

function noMatchError(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
    res.status(404).json({
        status: 'error',
        message: 'Not found',
    });
}

export default errorHandlerMiddleware;
