import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1"
import UpdProfile from "../../../entity/v1/user/student_profile.ent.v1"
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
        // let user: IUser.Request.User_masterModule = req.body;
        let payload: IUser.Request.Student_profileModule = req.body;
        let check_student = await UserV1.check_email(payload)
        if (check_student.success === false) {
            let check_phone = await UserV1.check_phone(payload)
            // console.log(check_phone)
            if (check_phone.success === true) {
                this.sendResponse(res, error.user.phone_number_already)
            } else {
                let user_data = await StudentV1.register_student_data(payload);
                if (user_data.success == true) {
                    this.sendResponse(res, success.default)
                } else {
                    this.sendResponse(res, error.user.user_not_register)
                }
            }
        } else {
            this.sendResponse(res, error.user.email_already)
        }
    }

    async join_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Join_classModule = req.body;
            let check_student = await UpdProfile.student_profile(req.user);
            if (check_student.success === true) {
                let check_class = await StudentV1.check_class(payload);
                if (check_class.success === true) {
                    let check_req = await StudentV1.check_req(req.user, payload);
                    if (check_req.success === false) {
                        let check_status = await StudentV1.check_status(req.user, payload)
                        if (check_status.success === true) {
                            this.sendResponse(res, success.accepted)
                        } else {
                            let rejected_request = await StudentV1.check_stats_again(req.user, payload)
                            if (rejected_request.success === true) {
                                let request_again = await StudentV1.rejected_request(payload)
                                if (request_again.success === true) {
                                    this.sendResponse(res, success.requested)
                                }
                            } else {
                                let join = await StudentV1.class_requested(payload, check_student.data, check_class.data);
                                if (join.success == true) {
                                    this.sendResponse(res, success.requested)
                                } else {
                                    this.sendResponse(res, error.user.user_not_register)
                                }
                            }
                        }
                    } else {
                        this.sendResponse(res, error.user.request_already)
                    }
                } else {
                    this.sendResponse(res, error.user.credential_not_matched)
                }
            } else {
                this.sendResponse(res, error.user.own_class)
            }
        } catch (err) {
            next(err)
        }
    }
}

export const studentCtrV1 = new StudentCtrClass();