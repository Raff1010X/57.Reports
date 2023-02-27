import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
const sanitize = require("mongo-sanitize"); 

const mongoSanitize = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);

    return next(req, res);
};

export default mongoSanitize;