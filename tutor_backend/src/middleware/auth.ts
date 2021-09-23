import { NextFunction, Response } from "express";
import { responses } from "../utility/constants";
//import logger from "../utility/logger";

export default async (
  req: IApp.IRequest,
  res: Response,
  next: NextFunction): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(200).send(responses[401]);
    } else {
      await next();
    }
  } catch (err) {
    res.status(200).send(err.stack)
  }
}
