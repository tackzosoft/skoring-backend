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
            //let body: IUser.Request.User_masterModule = req.body;
            let payload: IUser.Request.Create_classModule = req.body;
            let check_teacher = await UserV1.get_user_data_by_user_id(req.user)
            if (check_teacher.success === true) {
                let data = await ClassV1.class_created(payload, req.user);
                if (data.success == true) {
                    this.sendResponse(res, success.default, { data })
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

    async join_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            // let bodys: IUser.Request.Create_classModule = req.body;
            let payload: IUser.Request.Join_classModule = req.body;
            let check_student = await UserV1.get_user_data_by_user_id(req.user)
            if (check_student.success === true) {
                let check_user = await ClassV1.check_req(payload);
                if ( check_user.success === false) {
                    let join = await ClassV1.class_requested(payload, req.user);
                    if (join.success == true) {
                        this.sendResponse(res, success.requested)
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

    async accept_request(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Accept_requestModule = req.body;
            // let requests: IUser.Request.Join_classModule = req.body;
            let check_student = await UserV1.get_user_data_by_user_id(req.user)
            if (check_student.success === true) {
                let join = await ClassV1.accepted_request(payload, req.user);
                if (join.success == true) {
                    this.sendResponse(res, success.accepted)
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