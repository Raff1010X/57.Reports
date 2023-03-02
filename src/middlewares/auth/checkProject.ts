import User from "@/models/userModel";
import AppError from "@/utils/appError";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

const checkProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
) => {

    const {project} = req.body;

    const checkProject = await User.findOne({project});
    if (checkProject) throw new AppError(409, `Project already exists! Change name of project.`)

    return next(req, res);
};

export default checkProject