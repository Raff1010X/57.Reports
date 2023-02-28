import { NextApiRequest, NextApiResponse } from "next/types";
import testModel from "@/models/testModel";
import AppError from "@/utils/appError";

export const testGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await testModel.create({name: "my name"})
    res.send(response);
};

export const testGetById = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("TEST" + req.body)
    console.log("TEST " + req.query.id)
    if (req.query.id === '15') throw new AppError(404, `Error throw ${req.query.id}`)
    const response = await testModel.find({name: req.query.id})
    res.send(response);
};