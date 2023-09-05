// Report controller

import type { NextApiRequest, NextApiResponse } from 'next';
import  Report  from '../models/reportModel';
import Page from '@/models/pageModel';
import { mongoWorker } from './mongoWorker';
import { IApiResponse } from '@/types/apiResponse';
import next from 'next/types';

interface IReportController {
    getReport: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    createReport: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    updateReport: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    deleteReport: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
}

export const reportController: IReportController = {
    getReport: async (req, res) => {
        if (req.query.reportID) {
            req.query.id = req.query.reportID;
            await mongoWorker(Report).getOne(req, res);
        } else {
            await mongoWorker(Report).getAll(req, res);
        }
    }
    ,
    createReport: async (req, res) => {
        if (req.query.reportID) {
            await mongoWorker(Page).create(req, res);
            return;
        }
        await mongoWorker(Report).create(req, res);
    }
    ,
    updateReport: async (req, res) => {
        req.query.id = req.query.reportID;
        await mongoWorker(Report).update(req, res);
    }
    ,
    deleteReport: async (req, res) => {
        req.query.id = req.query.reportID;
        await mongoWorker(Report).delete(req, res);
    }

};