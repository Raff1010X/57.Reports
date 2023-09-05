// Page controller

import Page from '../models/pageModel';
import { factoryController } from './factoryController';

export const pageController = factoryController(Page, 'pageID');

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { mongoWorker } from './mongoWorker';
// import { IApiResponse } from '@/types/apiResponse';
// interface IPageController {
//     getPage: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
//     createPage: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
//     updatePage: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
//     deletePage: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => Promise<void>;
// }

// export const pageController: IPageController = {
//     getPage: async (req, res) => {
//         if (req.query.pageID) {
//             req.query.id = req.query.pageID;
//             await mongoWorker(Page).getOne(req, res);
//         } else {
//             await mongoWorker(Page).getAll(req, res);
//         }
//     }
//     ,
//     createPage: async (req, res) => {
//         if (req.query.pageID) {
//             res.status(200).json({
//                 status: 'error',
//                 message: 'PageID is not a valid parameter for this endpoint',
//                 data: undefined,
//             });
//             return;
//         }
//         await mongoWorker(Page).create(req, res);
//     }
//     ,
//     updatePage: async (req, res) => {
//         req.query.id = req.query.pageID;
//         await mongoWorker(Page).update(req, res);
//     }
//     ,
//     deletePage: async (req, res) => {
//         req.query.id = req.query.pageID;
//         await mongoWorker(Page).delete(req, res);
//     }

// };