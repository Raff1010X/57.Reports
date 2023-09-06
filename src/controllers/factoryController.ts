// Factory function for creating controllers for CRUD operations on a model

import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Codes, IApiResponse } from '@/types/apiResponse';

interface IFactoryController {
    get: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    create: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    update: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    delete: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
}

export const factoryController = (model: mongoose.Model<mongoose.Document, {}>, reqID: string): IFactoryController => {
    return {
        get: catchAsync(async (req, res) => {
            if (req.query?.[reqID as string]) {
                req.query.id = req.query?.[reqID as string];
                const document = await model.findOne({ _id: req.query.id });
                sendResponse(res, document, 'retrieved');
            } else {
                const documents = await model.find();
                sendResponse(res, documents, 'retrieved');
            }
        }),
        create: catchAsync(async (req, res) => {
            if (req.query?.[reqID as string]) {
                res.status(200).json({
                    status: 'error',
                    message: `${reqID} is not a valid parameter for this endpoint`,
                    data: undefined,
                });
                return;
            }
            const document = await model.create(req.body)
            sendResponse(res, document, 'created');
        }),
        update: catchAsync(async (req, res) => {
            req.query.id = req.query?.[reqID as string];
            const document = await model.findByIdAndUpdate(req.query.id, req.body, {
                new: true,
                runValidators: true,
            });
            sendResponse(res, document, 'updated');
        }),
        delete: catchAsync(async (req, res) => {
            req.query.id = req.query?.[reqID as string];
            const document = await model.findByIdAndDelete(req.query.id);
            sendResponse(res, document, 'deleted');
        }),
    }

};

// catchAsync is a helper function that wraps an async function and catches any errors
function catchAsync(fn: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
        await fn(req, res)
            .catch((err) => {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Error processing document(s) request',
                    data: undefined,
                });
            });
    };
  }

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