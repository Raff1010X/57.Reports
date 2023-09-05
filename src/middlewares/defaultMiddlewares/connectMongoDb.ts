import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import mongoDbConnect from '@/utils/mongoDbConnect';

import { Model } from 'mongoose';
import Report, { IReport } from '../../models/reportModel';
import User, { IUser } from '../../models/userModel';
import SuperUser, { ISuperUser } from '../../models/superUserModel';
import Page, { IPage } from '@/models/pageModel';

const ReportModel: Model<IReport> = Report;
const UserModel: Model<IUser> = User;
const SuperUserModel: Model<ISuperUser> = SuperUser;
const PageModel: Model<IPage> = Page;

const mongoDbMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    await mongoDbConnect();
    //TODO: remove logger
    console.log(req.query);
    return next(req, res);
};

export default mongoDbMiddleware;
