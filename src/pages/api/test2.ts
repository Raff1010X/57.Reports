import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import createRouter from "next-connect";
import nextConnect from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const MyMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    console.log("ok");

    next(req, res);
};

handler.use(MyMiddleware);

handler.get((req: NextApiRequest, res: NextApiResponse) => {
    console.log("second")
    res.status(200).json({response: "ff"});
})

export default handler;

