import User from "@/models/userModel";
import { Codes } from "@/types/apiResponse";
import AppError from "@/utils/appError";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";


const existingUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const {email} = req.body;

    const user = await User.findOne({email});
    if (user) throw new AppError(Codes.Conflict, `User already exists!`)

    return next(req, res);
};

export default existingUser