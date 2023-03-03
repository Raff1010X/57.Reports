import * as mongoose from 'mongoose';
import AppError from './appError';
import { Codes } from '@/types/apiResponse';
const mongoUrl = process.env.mongoConnectionString;

const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions;

async function mongoDbConnect() {
    mongoose.set('strictQuery', false);
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(mongoUrl!, DB_OPTIONS).catch((err) => {
        throw new AppError(
            Codes.InternalServerError,
            `Database connection problem: ${err}`
        );
    });
}

export default mongoDbConnect;
