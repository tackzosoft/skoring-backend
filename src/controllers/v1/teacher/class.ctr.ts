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
                    this.sendResponse(res, success.default, { class_code, class_id })
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

    async get_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            // let payload: IUser.Request.Teacher_profileModule = req.body;
            let check_user = await UserV1.get_user_data_by_user_id(req.user);

            if (check_user.success == true) {
                let get_data = await ClassV1.get_classes(req.user);
                // console.log(req.user)
                if (get_data.success == true) {
                    let class_data = get_data.data
                    this.sendResponse(res, success.default, class_data)
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

    async get_class_student(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Get_requests = req.body;
            let check_user = await UserV1.get_user_data_by_user_id(req.user);

            if (check_user.success == true) {
                let get_data = await ClassV1.get_classes_student(payload);
                // console.log(req.user)
                if (get_data.success == true) {
                    let class_data = get_data.data
                    this.sendResponse(res, success.default, class_data)
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

    async get_request(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Get_requests = req.body;
            let check_user = await ClassV1.check_teacher(req.user);

            if (check_user.success == true) {
                let get_data = await ClassV1.get_requests(payload);
                if (get_data.success == true) {
                    let class_data = get_data.data
                    this.sendResponse(res, success.default, class_data)
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
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
                    let check_active = await ClassV1.available_student(check_req.data)
                    if (check_active.success === false) {
                        if (payload.approved == 1) {
                            let check_student = await ClassV1.check_student(check_req.data)
                            if (check_student.success === false) {
                                let enter_data = await ClassV1.class_student(check_req.data)
                                if (enter_data.success === true) {
                                    let update_status = await ClassV1.accepted_request(payload)
                                    if (update_status.success === true) {
                                        this.sendResponse(res, success.accepted)
                                    } else {
                                        this.sendResponse(res, error.user.user_not_register)
                                    }
                                } else {
                                    this.sendResponse(res, error.user.user_not_register)
                                }
                            } else {
                                this.sendResponse(res, success.already_accepted)
                            }
                        } else {
                            let request_rejected = await ClassV1.rejected_request(payload)
                            if (request_rejected.success === true) {
                                this.sendResponse(res, success.rejected)
                            }
                        }
                    } else {
                        if (payload.approved == 1) {
                            let accept_again = await ClassV1.accepted_again(check_req.data)
                            if (accept_again.success === true) {
                                this.sendResponse(res, success.accepted)
                            }
                        } else {
                            let request_rejected = await ClassV1.rejected_request(payload)
                            if (request_rejected.success === true) {
                                this.sendResponse(res, success.rejected)
                            }
                        }

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

    async remove_student(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.remove_students = req.body;
            let check_user = await ClassV1.check_teacher(req.user);
            if (check_user.success == true) {
                let get_data = await ClassV1.check_students(payload);
                if (get_data.success == true) {
                    let remove = await ClassV1.removed_student(payload)
                    if(remove.success === true) {
                        let update_to_student = await ClassV1.rejected_request(payload)
                        if(update_to_student.success === true) {
                            this.sendResponse(res, success.removed)
                        }
                    }else{
                        this.sendResponse(res, error.user.removed_already);
                    }
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

}

export const classCtrV1 = new ClassCtrClass();