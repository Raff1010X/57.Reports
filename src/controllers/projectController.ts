// Project controller

import type { NextApiRequest, NextApiResponse } from 'next';
import Project from '../models/projectModel';
import Report from '@/models/reportModel';
import Page from '@/models/pageModel';
import { mongoWorker } from './mongoWorker';
import { IApiResponse } from '@/types/apiResponse';

interface IProjectController {
    getProject: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    createProject: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    updateProject: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
    deleteProject: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
}

export const projectController: IProjectController = {
    getProject: async (req, res) => {
        if (req.query.projectID) {
            req.query.id = req.query.projectID;
            await mongoWorker(Project).getOne(req, res);
        } else {
            await mongoWorker(Project).getAll(req, res);
        }
    }
    ,
    createProject: async (req, res) => {
        if (req.query.projectID) {
            await mongoWorker(Report).create(req, res);
            return;
        }
        await mongoWorker(Project).create(req, res);
    }
    ,
    updateProject: async (req, res) => {
        req.query.id = req.query.projectID;
        await mongoWorker(Project).update(req, res);
    }
    ,
    deleteProject: async (req, res) => {
        req.query.id = req.query.projectID;
        await mongoWorker(Project).delete(req, res);
    }

};  