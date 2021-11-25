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

    async get_joined_class(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let check_user = await UserV1.get_user_data_by_user_id(req.user);
            if (check_user.success == true) {
                let get_data = await StudentV1.get_student_of_class(req.user);
                if (get_data.success == true) {
                    let data = get_data.data
                    this.sendResponse(res, success.default, data)
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

    async get_task_for_student(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_user_class = await StudentV1.get_student_of_class(req.user);
            if (check_user_class.success === true) {
                let user_in_class = check_user_class.data
                user_in_class.map(async (joined_class: any) => {
                    let task_data = await StudentV1.task_chapter(payload, joined_class);
                    if (task_data.success === true) {

                        let topic_task = task_data.data
                        topic_task.map(async (daily_task: any) => {
                            let task_topic = await StudentV1.task_topic(payload, daily_task)
                            if (task_topic.success === true) {
                                console.log(task_topic)

                            }
                            if (daily_task === topic_task[topic_task.length - 1]) {
                                let chapter_data = task_data.data
                                let topic_data = task_topic.data
                                this.sendResponse(res, success.default, { chapter_data, topic_data })

                            }
                        })

                    }
                    if (joined_class === user_in_class[user_in_class.length - 1]) {
                        console.log(task_data)
                    }
                })
            }

        } catch (err) {
            next(err)
        }
    }

}

export const studentCtrV1 = new StudentCtrClass();