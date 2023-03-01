import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

const checkPassword = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    console.log("checkPassword middleware");

    return next(req, res);
};

export default checkPassword