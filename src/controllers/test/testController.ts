import { NextApiRequest, NextApiResponse } from "next/types";

export const testGet = async (req: NextApiRequest, res: NextApiResponse) => {
    res.send('Hello world');
};

export const testGetById = (req: NextApiRequest, res: NextApiResponse) => {
    res.send(`Query ${req.query.id}`);
};