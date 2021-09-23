import { Router, Request, Response, NextFunction } from "express";

import v1Routes from "./v1";

export default function (router: Router) {

  router.use(printRoutes);
  router.use(modifyHeaders);

  router.use('/v1', v1Routes(Router()));

  return router;
}

/** @description prints route to the console */
function printRoutes(req: Request, res: Response, next: NextFunction) {
  console.log(`\n========================= NEW REQUEST -> ${req.method} ${req.originalUrl}`);
  console.log(req.body);
  console.log(`\n=========================`);
  next();
}

/** @description modifies the headers for controllers */
function modifyHeaders(req: Request, res: Response, next: NextFunction) {
  next();
}

