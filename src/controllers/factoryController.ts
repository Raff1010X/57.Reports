// Factory function for CRUD operations on a model

import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Codes, IApiResponse } from '@/types/apiResponse';
import AppError from "@/utils/appError";

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
                const documents = await processDocuments(req, model);
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
                throw new AppError(Codes.BadRequest, err.message ?? 'Bad request');
            });
    };
  }

// sendResponse is a helper function that sends a response
const sendResponse = (res: NextApiResponse<IApiResponse>, documents: any, message: string) => {
    if (!documents) {
        throw new AppError(Codes.NotFound, `No document(s) found`);
    }
    res.status(Codes.OK).json({
        status: 'success',
        message: `Document(s) ${message} successfully`,
        data: documents,
    });
};

// processDocuments is a helper function that filter, sort, limit, and paginate documents [copilot]
// example of full query: /api/page?sort=-createdAt&fields=description,status&page=2&limit=10
async function processDocuments(req: NextApiRequest, model: mongoose.Model<mongoose.Document, {}>) {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = model.find(JSON.parse(queryStr));

    // 3) Sorting
    if (req.query.sort) {
        const sortBy = (req.query.sort as string).split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // 4) Field limiting
    if (req.query.fields) {
        const fields = (req.query.fields as string).split(',').join(' ');
        query = query.select(fields);
    }

    // 5) Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const documents = await query;

    return documents;
}
