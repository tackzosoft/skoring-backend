import { Request, Response, NextFunction } from "express";

import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1"
import UpdProfile from "../../../entity/v1/user/student_profile.ent.v1"
import StudentV1 from "../../../entity/v1/user/student.ent.v1"
import { success, error } from "../../../common";
import ClassV1 from "../../../entity/v1/teacher/class.ent.v1"
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
                let class_details: any = [];
                let get_data = await StudentV1.get_student_of_class(req.user);
                let Get_Data = get_data.data
                // console.log(get_data.length)
                if (Get_Data.length !== 0) {
                    // console.log("a")
                    let data = get_data.data
                    data.map(async (class_id: any) => {
                        let joined_class = await StudentV1.get_class(class_id)
                        if (joined_class.length !== 0) {
                            class_id["details"] = joined_class.data
                            class_details.push(class_id)
                            // console.log("b")

                        } else {
                            this.sendResponse(res, error.user.class_not_found);
                        }
                        if (class_id == data[data.length - 1]) {
                            let class_student = get_data.data
                            let Class_details = class_details.data
                            this.sendResponse(res, success.default, { class_student, Class_details })
                        }
                    })
                } else {
                    this.sendResponse(res, error.user.class_not_found);
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
                    let topic_task = task_data.data
                    if (topic_task.length !== 0) {

                    }
                    // else {
                    //     let topic_task = await StudentV1.task_topic(payload, joined_class)
                    //     if (topic_task.length !== 0) {
                    //         let topics = topic_task.data
                    //     }
                    // }
                    if (joined_class === user_in_class[user_in_class.length - 1]) {
                        this.sendResponse(res, success.default, topic_task)
                    }
                })
            } else {
                this.sendResponse(res, error.user.user_not_found)
            }

        } catch (err) {
            next(err)
        }
    }

    async get_assignment_list_student(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let check_user_class = await StudentV1.get_student_of_class(req.user);
            if (check_user_class.success === true) {
                let user_in_class = check_user_class.data
               // let assignment_data: any = []
                user_in_class.map(async (joined_class: any) => {
                    let assgn_data = await StudentV1.get_assgn_data(joined_class);
                    //let assignment: any = [];


                    this.sendResponse(res, success.default, assgn_data.data.rows)


                  
                })
            } else {
                this.sendResponse(res, error.user.user_not_found)
            }
        } catch (err) {
            next(err)
        }
    }

    async submit_assigment(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.submit_assigment = req.body;
            let assignment_qst = payload.assignment
            assignment_qst.map(async (assg_data: any) => {
                let assgn_data = await StudentV1.submit_assignment_data(assg_data, payload, req.user);
                if (assgn_data.success === true) {
                    console.log(assg_data)
                }
                if (assg_data == assignment_qst[assignment_qst.length - 1]) {
                    this.sendResponse(res, success.default)
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async get_submited_assignment(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            // let payload: IUser.Request.submit_assigment = req.body;
            // let assignment_qst = payload.assignment
            // assignment_qst.map(async (assg_data: any) => {
            let assgn_data = await StudentV1.get_submited_assignment_data(req.user);
            if (assgn_data.success === true) {
                let assignment = assgn_data.data
                this.sendResponse(res, success.default, assignment)
            } else {
                this.sendResponse(res, error.user.assignment_not_found)
            }
        } catch (err) {
            next(err)
        }
    }

    async get_assignment(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.assigment = req.body;
          
                let get_assignment_data = await ClassV1.get_assgn_data(payload);
                if (get_assignment_data.success === true) {
                    // console.log("1")
                    let assgn_data = get_assignment_data.data
                    let assignment_questions: any = []
                    let assg_qst = assgn_data.assigment_question
                    assg_qst.map(async (empty_data: any) => {
                        let get_opt = await ClassV1.get_assgn_opt(empty_data)
                        if (get_opt.success === true) {
                            // console.log(get_opt.data)
                            empty_data["options"] = get_opt.data
                            assignment_questions.push(empty_data)
                            // console.log(assignment_questions)
                            if (empty_data == assg_qst[assg_qst.length - 1]) {
                                // console.log("3")
                                // console.log(get_opt.data)
                                // let assignment_data = assgn_data.data
                                // let assigment_questions = assignment_questions.data
                                this.sendResponse(res, success.default, { assgn_data, assignment_questions })
                            }
                        } else {
                            // console.log("4")
                            empty_data["options"] = null
                            assignment_questions.push(empty_data)
                            if (empty_data == assg_qst[assg_qst.length - 1]) {
                                // let assignment_data = assgn_data.data
                                // let assigment_questions = assignment_questions.data
                                this.sendResponse(res, success.default, { assgn_data, assignment_questions })
                            }
                        }

                    })
                }
            
        } catch (err) {
            next(err)
        }
    }

}

export const studentCtrV1 = new StudentCtrClass();