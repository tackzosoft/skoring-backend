/**
 * response
 *
 * middleware for tracking responses
 */

/**
 * config
 */
import { NextFunction, Response } from 'express';

import {responses} from '../utility/constants';
// import logger from '../utility/logger';
import Session from "../utility/session";

export default async (
  req: any,
  res: Response,
  next: NextFunction) => {
  try {
    if(req.headers.authorization && req.headers.authorization !== 'Bearer undefined' && req.headers.authorization !== 'Bearer ') {
        try{
          const payload = await Session.get(req.headers.authorization.replace('Bearer ', ''));
          if(payload) {
              req.user = payload;
              const token = await Session.set(payload);
              res.set('autohorization', token);
          }
        }catch(e){

        }
    }
    await next();
    res.set('Content-Type', 'application/json');
    //logRequest(start, req);
  } catch (err) {
    console.log(err.stack);
    res.status(200).send(responses[401]);
  }
}
