import { Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1"
import ClassV1 from "../../../entity/v1/teacher/class.ent.v1"
import { success, error } from "../../../common";
// import { helper } from "../../../services";


class ClassCtrClass extends BaseCtr {

    constructor() {
        super()
    }

    async create_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Create_classModule = req.body;
            let check_teacher = await UserV1.get_user_data_by_user_id(req.user)
            if (check_teacher.success === true) {

                let class_create = await ClassV1.class_created(payload, req.user);
                if (class_create.success == true) {
                    let class_code = class_create.class_code
                    let class_id = class_create.class_id
                    this.sendResponse(res, success.default, {class_code,class_id} )
                } else {
                    this.sendResponse(res, error.user.user_not_register)
                }

            } else {
                this.sendResponse(res, error.user.user_already)
            }
        } catch (err) {
            next(err)
        }
    }



    async accept_request(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Accept_requestModule = req.body;
            let check_student = await UserV1.get_user_data_by_user_id(req.user)
            if (check_student.success === true) {
                let check_req = await ClassV1.check_req(payload)
                if (check_req.success === true) {
                    let join = await ClassV1.accepted_request(payload, req.user);
                    if (join.success == true) {
                        let check_student = await ClassV1.check_student(check_req.data)
                        if (check_student.success === false) {
                            let enter_data = await ClassV1.class_student(check_req.data)
                            if (enter_data.success === true) {
                                this.sendResponse(res, success.default)
                            } else {
                                this.sendResponse(res, error.user.user_not_register)
                            }
                        } else {
                            this.sendResponse(res, error.user.student_already)
                        }
                    } else {
                        this.sendResponse(res, error.user.user_already)
                    }
                } else {
                    this.sendResponse(res, error.user.user_not_register)
                }
            } else {
                this.sendResponse(res, error.user.user_already)
            }
        } catch (err) {
            next(err)
        }
    }

}

export const classCtrV1 = new ClassCtrClass();