import { IApiResponse } from '@/types/apiResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import AppError from '@/utils/appError';
import { Codes } from '@/types/apiResponse';

export const errorHandlerMiddleware = {
    onError: (
        err: unknown,
        req: NextApiRequest,
        res: NextApiResponse<IApiResponse>
    ) => {
        
        if (process.env.NODE_ENV === 'development') {
            console.log(err?.constructor.name);
            console.log(err);
        }

        if (err instanceof AppError) {
            handleAppErrors(err, req, res);
            return;
        }
        if (err?.constructor.name === 'MongoServerError') {
            handleMongooseErrors(err, req, res);
            return;
        }
        handleRestOfErrors(err, req, res);
    },

    onNoMatch: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) =>
        noMatchError(req, res),
};

function handleMongooseErrors(
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    res.status(Codes.BadRequest).json({
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
    res.status(Codes.InternalServerError).json({
        status: 'error',
        message: 'Internal server error',
    });
}

function noMatchError(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
    res.status(Codes.NotFound).json({
        status: 'error',
        message: 'Not found',
    });
}

export default errorHandlerMiddleware;
