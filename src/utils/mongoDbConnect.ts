import * as mongoose from 'mongoose';
import AppError from './appError';
import { Codes } from '@/types/apiResponse';

// initialize models
import { Model } from 'mongoose';
import Report, { IReport } from '../models/reportModel';
import User, { IUser } from '../models/userModel';
import SuperUser, { ISuperUser } from '../models/superUserModel';
import Page, { IPage } from '@/models/pageModel';
import Project, { IProject } from '@/models/projectModel';
import FirstPage, { TFirstPage } from '@/models/firstPageModel';
import PageLayout, { IPageLayout } from '@/models/pageLayoutModel';

const ReportModel: Model<IReport> = Report;
const UserModel: Model<IUser> = User;
const SuperUserModel: Model<ISuperUser> = SuperUser;
const PageModel: Model<IPage> = Page;
const ProjectModel: Model<IProject> = Project;
const FirstPageModel: Model<TFirstPage> = FirstPage;
const PageLayoutModel: Model<IPageLayout> = PageLayout;
// end initialize models

const mongoUrl = process.env.mongoConnectionString;

const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions;

async function mongoDbConnect() {
    if (mongoose.connections[0].readyState) return;
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUrl!, DB_OPTIONS).catch((err) => {
        throw new AppError(
            Codes.InternalServerError,
            `Database connection problem: ${err}`
        );
    });
}

export default mongoDbConnect;
