import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

export const testMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    console.log("TEST middleware");

    return next(req, res);
};


