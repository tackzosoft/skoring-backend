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
}

export const studentCtrV1 = new StudentCtrClass();