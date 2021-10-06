import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1"
import StudentV1 from "../../../entity/v1/user/student.ent.v1"
import { success, error } from "../../../common";
// import { helper } from "../../../services";


class StudentCtrClass extends BaseCtr {

    constructor() {
        super()
    }

    /**
     * 
     *@description registration api
     */

    async register_student(req: Request, res: Response, next: NextFunction) {
        let user: IUser.Request.User_masterModule = req.body;
        let payload: IUser.Request.Student_profileModule = req.body;
        let check_student = await UserV1.check_user(user)
        if (check_student.success === false) {

            let user_data = await StudentV1.register_student_data(payload);
            if (user_data.success == true) {
                this.sendResponse(res, success.default)
            } else {
                this.sendResponse(res, error.user.user_not_register)
            }
        } else {
            this.sendResponse(res, error.user.user_already)
        }
    }

    async join_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Join_classModule = req.body;
            let check_student = await UserV1.get_user_data_by_user_id(req.user)
            if (check_student.success === true) {
                let check_req = await StudentV1.check_class(payload);
                if (check_req.success === true) {
                    let check_req = await StudentV1.check_req(payload, req.user);
                    if (check_req.success === false) {
                        let join = await StudentV1.class_requested(payload, req.user);
                        if (join.success == true) {
                            this.sendResponse(res, success.requested)
                        } else {
                            this.sendResponse(res, error.user.user_not_register)
                        }
                    } else {
                        this.sendResponse(res, error.user.user_already)
                    }
                } else {
                    this.sendResponse(res, error.user.credential_not_matched)
                }
            } else {
                this.sendResponse(res, error.user.user_not_register)
            }
        } catch (err) {
            next(err)
        }
    }
}

export const studentCtrV1 = new StudentCtrClass();