import User from "@/models/userModel";
import AppError from "@/utils/appError";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";


const checkUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {
    const {email} = req.body;

    const user = await User.findOne({email});
    if (user) throw new AppError(409, `Can't signup. Project or user already exists!`)

    return next(req, res);
};

export default checkUser