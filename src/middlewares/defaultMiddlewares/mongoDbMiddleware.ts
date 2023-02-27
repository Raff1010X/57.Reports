import * as mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const mongoUrl = process.env.mongoConnectionString;
    // 'mongodb+srv://mytestuser:gXOfONBTNf6ZrHbm@cluster0.ou96zs3.mongodb.net/report?retryWrites=true&w=majority';

const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions;

const mongoDbMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    if (mongoose.connections[0].readyState) {
       return next(req, res);
    }
    await mongoose.connect(mongoUrl!, DB_OPTIONS)
    return next(req, res);
};

export default mongoDbMiddleware;
