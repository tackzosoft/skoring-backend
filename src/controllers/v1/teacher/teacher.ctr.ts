import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1";
import TeacherV1 from "../../../entity/v1/teacher/teacher.ent.v1"
import { success, error } from "../../../common";
// import { helper } from "../../../services";


class TeacherCtrClass extends BaseCtr {

    constructor() {
        super()
    }



    async register_teacher(req: Request, res: Response, next: NextFunction) {
        try {
            // let body: IUser.Request.User_masterModule = req.body;
            let payload: IUser.Request.Teacher_profileModule = req.body;
            let check_teacher = await UserV1.check_email(payload)
            if (check_teacher.success === false) {
                let check_phone = await UserV1.check_phone(payload)
                if (check_phone.success === false) {
                    let teacher_mod_user = await TeacherV1.register_teacher_data(payload);
                    if (teacher_mod_user.success == true) {
                        this.sendResponse(res, success.default)
                    } else {
                        this.sendResponse(res, error.user.user_not_register)
                    }
                } else {
                    this.sendResponse(res, error.user.user_already)
                }
            } else {
                this.sendResponse(res, error.user.user_already)
            }
        } catch (err) {
            next(err)
        }
    }
}

export const teacherCtrV1 = new TeacherCtrClass();