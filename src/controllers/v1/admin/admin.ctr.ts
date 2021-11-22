import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import AdminV1 from "../../../entity/v1/admin/admin.ent.v1"
import { success, error } from "../../../common";
import { helper } from "../../../services";


class AdminCtrClass extends BaseCtr {

    constructor() {
        super()
    }

    /**
     * @description login api
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {

            let payload: IUser.Request.LoginUser = req.body;
            let check_user = await AdminV1.check_user(payload)
            if (check_user.success == true) {


                let user_auth = await AdminV1.get_user_details(payload)
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

    async get_active_students(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let active_students = await AdminV1.get_students_list()
            if (active_students.success === true) {
                this.sendResponse(res, success.default, active_students)
            } else {
                this.sendResponse(res, error.user.student_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async get_active_teachers(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let active_teachers = await AdminV1.get_teachers_list()
            if (active_teachers.success === true) {
                this.sendResponse(res, success.default, active_teachers)
            } else {
                this.sendResponse(res, error.user.student_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async get_inactive_students(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let inactive_students = await AdminV1.get_inactive_students_list()
            if (inactive_students.success === true) {
                this.sendResponse(res, success.default, inactive_students)
            } else {
                this.sendResponse(res, error.user.student_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async get_inactive_teachers(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let inactive_teachers = await AdminV1.get_inactive_teachers_list()
            if (inactive_teachers.success === true) {
                this.sendResponse(res, success.default, inactive_teachers)
            } else {
                this.sendResponse(res, error.user.student_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async get_approval_request(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.User_masterModule = req.body;
            let check_admin = await AdminV1.check_admin(req.user)
            if (check_admin.success === true) {
                let approval_requests = await AdminV1.get_users(payload)
                if (approval_requests.success === true) {
                    let users_request = approval_requests.data
                    this.sendResponse(res, success.default, users_request)
                } else {
                    this.sendResponse(res, error.user.request_not_found)

                }
            } else {
                this.sendResponse(res, error.user.student_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async approve_user(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.User_masterModule = req.body;
            let check_admin = await AdminV1.check_admin(req.user)
            if (check_admin.success === true) {
                if (payload.approved == 1) {
                    let approval_requests = await AdminV1.approved_user(payload)
                    if (approval_requests.success === true) {
                        if (payload.user_type == 0) {
                            let approved_student = await AdminV1.approved_student(payload)
                            if (approved_student.success === true) {
                                
                                this.sendResponse(res, success.default)
                            }
                        } else {
                            let approved_teacher = await AdminV1.approved_teacher(payload)
                            if (approved_teacher.success === true) {
                               
                                this.sendResponse(res, success.default)
                            }
                        }
                    } else {
                        this.sendResponse(res, error.user.user_not_found)

                    }
                } else {
                    let remove_request = await AdminV1.remove_user(payload)
                    if (remove_request.success === true) {
                        if (payload.user_type == 0) {
                            let remove_student = await AdminV1.remove_student(payload)
                            if (remove_student.success === true) {
                                this.sendResponse(res, success.default)
                            }
                        } else {
                            let remove_teacher = await AdminV1.remove_teacher(payload)
                            if (remove_teacher.success === true) {
                                // let users_request = approval_requests.data
                                this.sendResponse(res, success.default)
                            }
                        }
                    } else {
                        this.sendResponse(res, error.user.user_not_found)

                    }
                }
            } else {
                this.sendResponse(res, error.user.user_not_found)
            }

        } catch (err) {
            next(err)
        }
    }
}

export const AdminCtrV1 = new AdminCtrClass();