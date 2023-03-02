import { NextApiRequest, NextApiResponse } from 'next/types';
import testModel from '@/models/testModel';
import AppError from '@/utils/appError';
import { Codes } from '@/types/apiResponse';

export const testGet = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('test get');
    console.log('TEST ' + req.body.name);
    console.log('TEST ' + req.query.id);
    if (req.query.id === '15')
        throw new AppError(Codes.NotFound, `Error throw ${req.query.id}`);
    const response = await testModel.create({ name: 'my name' });
    res.send(response);
};

export const testGetById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    console.log('test get BY ID');
    console.log('TEST ' + req.body.name);
    console.log('TEST ' + req.query.id);
    if (req.query.id === '15')
        throw new AppError(Codes.NotFound, `Error throw ${req.query.id}`);
    const response = await testModel.find({ name: req.query.id });
    res.send(response);
};

function checkStatus(s: number) {
    return Object.values(Codes)
        .filter((v) => !isNaN(Number(v)))
        .some((el) => {
            return el === s;
        });
}

export const testGet2 = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('test get2');
    res.send(checkStatus(200));
};
