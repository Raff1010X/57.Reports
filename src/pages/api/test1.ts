import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
    console.log('second');
    res.status(200).json({ text: 'ff' });
});

export default handler;
