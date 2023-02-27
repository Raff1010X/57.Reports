import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';




const handler = nextConnect<NextApiRequest, NextApiResponse>();

const myMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    console.log("ok");
    next(req, res)
    res.end();
};

handler.use("/",myMiddleware).get((req: NextApiRequest, res: NextApiResponse) => {
    console.log("second")
    res.status(200).json({response: "ff"});
})

export default handler;

