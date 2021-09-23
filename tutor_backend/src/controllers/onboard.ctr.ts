import { Request, Response, NextFunction } from "express";

import BaseCtr from "../controllers/v1/base.ctr";
import { UserV1 } from "../entity";
import { success, error } from "../common";

class OnBoardCtrClass extends BaseCtr {

  constructor() {
    super();
  }

  /**
   * @method post
   * @description register new user on platform
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: IUser.Request.RegisterUser = req.body;
      let checkIfUserExists = await UserV1.checkUserByEmailOrPhone(payload);
      if (checkIfUserExists.success) {
        this.sendResponse(res, error.user.user_already_exists);
      } else {
        let createUser = await UserV1.createUser(payload);
        if (createUser.success) {
          this.sendResponse(res, success.default, createUser.data);
        } else throw Error('Error creating User');
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method post
   * @description login user using credentails/social login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: IUser.Request.LoginUser = req.body;
      payload.mobile_no = payload.email;
      let checkIfUserExists = await UserV1.checkUserByEmailOrPhone(payload);
      if (!checkIfUserExists.success) {
        this.sendResponse(res, error.user.user_not_found);
      } else {
        let userIdData = await UserV1.getUserIdDataById(checkIfUserExists.data.user_id);
        if (!userIdData.success) {
          this.sendResponse(res, error.user.user_not_found);
        } else {
          if ((checkIfUserExists.data.email || checkIfUserExists.data.mobile_no === payload.email) &&
            userIdData.data.password === payload.password
          ) {
            return this.sendResponse(res, success.default, checkIfUserExists.data);
          } else this.sendResponse(res, error.user.invalid_credentails);
        }
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method post
   * @description registers a new business on the platform
   */
  async verifyLoginOTP(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method post
   * @description registers a new business on the platform
   */
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: IUser.Request.RegisterUser = req.body;
      let checkIfUserExists = await UserV1.checkUserByEmailOrPhone(payload);
      if (!checkIfUserExists.success) {
        this.sendResponse(res, error.user.user_not_found);
      } else {
        return this.sendResponse(res, success.default);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method post
   * @description registers a new business on the platform
   */
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

}

export const onBoardCtr = new OnBoardCtrClass();