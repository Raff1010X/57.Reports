import { NextApiRequest, NextApiResponse } from 'next';

export const handlerError = {
    onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
        res.status(500).end('Something broke!');
    },
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
        res.status(404).end('Page is not found');
    },
};
