// Mongo worker for CRUD operations

import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Codes, IApiResponse } from '@/types/apiResponse';

export const mongoWorker = (model: mongoose.Model<mongoose.Document, {}>) => {
    return {
        getAll: catchAsync(async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
                const documents = await model.find();
                sendResponse(res, documents, 'retrieved');
        }),
        getOne: catchAsync(async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
                const document = await model.findOne({ _id: req.query.id });
                sendResponse(res, document, 'retrieved');
        }),
        create: catchAsync( async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
                const document = await model.create(req.body)
                sendResponse(res, document, 'created');
        }),
        update: catchAsync( async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
                const document = await model.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                sendResponse(res, document, 'updated');
        }),
        delete: catchAsync(async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
                const document = await model.findByIdAndDelete(req.query.id);
                sendResponse(res, document, 'deleted');
        })
    }
}

// catchAsync is a helper function that wraps an async function and catches any errors
const catchAsync = (fn: any) => {
    return (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
        fn(req, res).catch((err: any) => {
            res.status(Codes.BadRequest).json({
                status: 'error',
                message: err.message,
                data: undefined,
            });
        });
    };
};

// sendResponse is a helper function that sends a response
const sendResponse = (res: NextApiResponse<IApiResponse>, documents: any, message: string) => {
    if (!documents) {
        res.status(Codes.NotFound).json({
            status: 'error',
            message: 'Document(s) not found',
            data: undefined,
        });
        return;
    }
    res.status(Codes.OK).json({
        status: 'success',
        message: `Document(s) ${message} successfully`,
        data: documents,
    });
};