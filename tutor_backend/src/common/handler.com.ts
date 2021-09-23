import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

export const invalidRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: 'Route not found' })
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if error is a validation error, otherwise return server error
  if (isCelebrateError(err)) {
    return res.status(400).send({
      success: false,
      statusCode: 400,
      key: err.details.get('body')?.details[0].context?.key,
      message: err.details.get('body')?.details[0].message.replace(/"/g, '')
    });
  } else if (err.expose) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode
    });
  } else {
    console.log('ERROR -> ', err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }
}