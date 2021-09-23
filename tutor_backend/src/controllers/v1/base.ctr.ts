import { Response } from "express";

export default class BaseCtr {
  constructor() { }

  sendResponse(r: Response, b: IApp.Dispatcher, d?: any) {
    if (typeof d === "number") b.statusCode = d;
    if (typeof d === "string") b.message = d;
    if (typeof d === "object" && d) b.data = d;
    else b.data = {};
    r.status(b.httpCode).json(b);
  }

  errorResponse(r: Response, err: any) {
    r.status(400).json({ message: err.message });
  }
}