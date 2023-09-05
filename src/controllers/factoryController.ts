// Controller factory functions
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoWorker } from './mongoWorker';
import { IApiResponse } from '@/types/apiResponse';

interface IFactoryController {
    get: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    create: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    update: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    delete: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
}

export const factoryController = (model: mongoose.Model<mongoose.Document, {}>, reqID: string): IFactoryController => {
    return {
        get: async (req, res) => {
            if (req.query?.[reqID as string]) {
                req.query.id = req.query?.[reqID as string];
                await mongoWorker(model).getOne(req, res);
            } else {
                await mongoWorker(model).getAll(req, res);
            }
        }
        ,
        create: async (req, res) => {
            if (req.query?.[reqID as string]) {
                res.status(200).json({
                    status: 'error',
                    message: `${reqID} is not a valid parameter for this endpoint`,
                    data: undefined,
                });
                return;
            }
            await mongoWorker(model).create(req, res);
        }
        ,
        update: async (req, res) => {
            req.query.id = req.query?.[reqID as string];
            await mongoWorker(model).update(req, res);
        }
        ,
        delete: async (req, res) => {
            req.query.id = req.query?.[reqID as string];
            await mongoWorker(model).delete(req, res);
        }
    }

};