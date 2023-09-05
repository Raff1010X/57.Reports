// factory functions to create, read, update, and delete documents in a MongoDB database
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Codes, IApiResponse } from '@/types/apiResponse';

export const mongoWorker = (model: mongoose.Model<mongoose.Document, {}>) => {
    return {
        // get all documents
        getAll: async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
            try {
                const documents = await model.find();
                if (!documents) {
                    res.status(Codes.NotFound).json({
                        status: 'error',
                        message: 'Documents not found',
                        data: undefined,
                    });
                    return;
                }
                res.status(Codes.OK).json({
                    status: 'success',
                    message: 'Documents retrieved successfully',
                    data: documents,
                });
            } catch (error: any) {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Documents not found',
                    data: undefined,
                });
            }
        }
        ,
        // get a single document
        getOne: async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
            try {
                const document = await model.findOne({ _id: req.query.id });
                if (!document) {
                    res.status(Codes.NotFound).json({
                        status: 'error',
                        message: 'Document not found',
                        data: undefined,
                    });
                    return;
                }
                res.status(Codes.OK).json({
                    status: 'success',
                    message: 'Document retrieved successfully',
                    data: document,
                });
            } catch (error: any) {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Document not found',
                    data: undefined,
                });
            }
        }
        ,
        // create a document
        create: async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
            try {
                const document = await model.create(req.body)
                if (!document) {
                    res.status(Codes.BadRequest).json({
                        status: 'error',
                        message: 'Document not created',
                        data: undefined,
                    });
                    return;
                }
                res.status(Codes.Created).json({
                    status: 'success',
                    message: 'Document created successfully',
                    data: document,
                });
            } catch (error: any) {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Document not created',
                    data: undefined,
                });
            }
        }
        ,
        // update a document
        update: async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
            try {
                const document = await model.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!document) {
                    res.status(Codes.NotFound).json({
                        status: 'error',
                        message: 'Document not found',
                        data: undefined,
                    });
                    return;
                }
                res.status(Codes.OK).json({
                    status: 'success',
                    message: 'Document updated successfully',
                    data: undefined,
                });
            } catch (error: any) {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Document not updated',
                    data: undefined,
                });
            }
        }
        ,
        // delete a document
        delete: async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {
            try {
                const document = await model.findByIdAndDelete(req.query.id);
                if (!document) {
                    res.status(Codes.NotFound).json({
                        status: 'error',
                        message: 'Document not found',
                        data: undefined,
                    });
                    return;
                }
                res.status(Codes.OK).json({
                    status: 'success',
                    message: 'Document deleted successfully',
                    data: undefined,
                });
            } catch (error: any) {
                res.status(Codes.BadRequest).json({
                    status: 'error',
                    message: 'Document not deleted',
                    data: undefined,
                });
            }
        }
    }
}