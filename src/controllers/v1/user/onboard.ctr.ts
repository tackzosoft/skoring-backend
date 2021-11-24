import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1"
import { success, error } from "../../../common";
import { helper } from "../../../services";


class OnBoardCtrClass extends BaseCtr {

    constructor() {
        super()
    }

    /**
     * @description login api
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {

            let payload: IUser.Request.LoginUser = req.body;
            let check_user = await UserV1.check_user(payload)
            if (check_user.success == true) {
                

                let user_auth = await UserV1.get_user_details(payload)
                if (user_auth.success == true) {
                    console.log(user_auth)
                    console.log(payload)
                    if (helper.authorize(user_auth, payload)) {
                        const token = helper.generateToken(user_auth);
                        this.sendResponse(res, success.default, { data: user_auth.data, token: token })
                    } else {
                        this.sendResponse(res, error.user.credential_not_match)
                    }
                } else {
                    this.sendResponse(res, error.user.user_not_found)
                }
            } else {
                this.sendResponse(res, error.user.user_not_found)
            }

        } catch (err) {
            next(err);

        }
    }
}

export const onBoardCtrV1 = new OnBoardCtrClass();