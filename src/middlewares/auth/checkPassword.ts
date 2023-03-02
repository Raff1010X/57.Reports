import { Codes } from "@/types/apiResponse";
import AppError from "@/utils/appError";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

const checkPassword = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const {password} = req.body;
    if (password.length < 8) throw new AppError(Codes.BadRequest, 'Password should be longer than 8 characters')
    if (password.length > 50) throw new AppError(Codes.BadRequest, 'Password should not be longer than 50 characters')
    return next(req, res);
};

export default checkPassword