import * as mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const mongoUrl =
    'mongodb+srv://mytestuser:gXOfONBTNf6ZrHbm@cluster0.ou96zs3.mongodb.net/test?retryWrites=true&w=majority';

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
        console.log('Use current DB connection'); //TODO: delete
        return next(req, res);
    }
    await mongoose
        .connect(mongoUrl, DB_OPTIONS)
        .then(() => console.log('DB connection successful')) //TODO: delete
        .catch((err) => console.log(err)); //TODO: delete
    return next(req, res);
};

export default mongoDbMiddleware;
