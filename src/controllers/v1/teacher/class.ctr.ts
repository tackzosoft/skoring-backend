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
            // let class_students: any = [];
            if (check_user.success == true) {
                let get_data = await ClassV1.get_classes_student(payload);
                // console.log(req.user)
                if (get_data.success == true) {
                    // let cls_id: any = payload.class_id
                    let get_class = await ClassV1.get_class(payload)
                    if (get_class.success === true) {
                        // console.log(get_class)
                        // cls_id["class_details"] = class_students.data
                        // class_students.push(cls_id)
                        // get_data = class_students.data
                        // get_data["class_details"] = get_class.data
                        // get_data.push(get_class)
                        let class_students = get_data.data
                        let class_details = get_class.data
                        this.sendResponse(res, success.default, { class_students, class_details })
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
                    if (remove.success === true) {
                        let update_to_student = await ClassV1.rejected_request(payload)
                        if (update_to_student.success === true) {
                            this.sendResponse(res, success.removed)
                        }
                    } else {
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

    async add_student(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_studeent = req.body;
            let check_user = await ClassV1.check_teacher(req.user);
            if (check_user.success == true) {
                let get_data = await ClassV1.check_available_students(payload);
                if (get_data.success == true) {
                    let accept_request = await ClassV1.accept_request(payload);
                    if (accept_request.success === true) {
                        this.sendResponse(res, success.default);
                    } else {
                        this.sendResponse(res, error.user.user_not_found);
                    }
                } else {
                    let check_student = await ClassV1.check_invited_student(payload)
                    if (check_student.success === true) {
                        let add_student_request = await ClassV1.add_student_request(payload, req.user)
                        if (add_student_request.success === true) {
                            this.sendResponse(res, success.default);
                        } else {
                            this.sendResponse(res, error.user.user_not_register);
                        }
                    } else {
                        this.sendResponse(res, error.user.student_already_invited);
                    }
                }

            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

    async student_attendence(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_studeent = req.body;
            let check_user = await ClassV1.check_teacher(req.user);
            if (check_user.success === true) {
                let check_attendence = await ClassV1.check_attendence(payload);
                // console.log(check_attendence.data)
                let updateAttendence = check_attendence.data
                if (updateAttendence.length == 0) {
                    let student_list = payload.students
                    student_list.map(async (attendence_student: any) => {
                        let check_student = await ClassV1.check_student_attendence(attendence_student, payload)
                        if (check_student.success === true) {
                            let add_attendence = await ClassV1.student_attendence(attendence_student, payload, req.user)
                            if (attendence_student == student_list[student_list.length - 1]) {
                                console.log(add_attendence);
                                this.sendResponse(res, success.default)
                            }
                        } else {
                            this.sendResponse(res, error.user.student_not_found);
                        }
                    })
                } else {
                    // console.log("abd")
                    let student_list = payload.students
                    student_list.map(async (attendence_student: any) => {
                        let check_student = await ClassV1.check_student_attendence(attendence_student, payload)
                        if (check_student.success === true) {
                            let add_attendence = await ClassV1.update_student_attendence(attendence_student, payload)
                            if (attendence_student == student_list[student_list.length - 1]) {
                                console.log(add_attendence);
                                this.sendResponse(res, success.default)
                            }
                        } else {
                            this.sendResponse(res, error.user.student_not_found);
                        }
                    })
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }

        } catch (err) {
            next(err)
        }
    }

    async get_attendence(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_studeent = req.body;
            let get_data = await ClassV1.get_student_attendence(payload, req.user);
            // console.log(get_data.data)
            let getData = get_data.data
            // let details: any = [];
            if (getData.length !== 0) {
                getData.map(async (std_id: any) => {
                    let get_class_student = await ClassV1.get_class_student_data(std_id);
                    if (get_class_student.success === true) {
                        std_id["details"] = get_class_student.data
                        // details.push(std_id)
                    }
                    if (std_id == getData[getData.length - 1]) {

                        let class_student = get_data.data
                        this.sendResponse(res, success.default, class_student)
                    }
                })
            } else {
                let class_data = await ClassV1.get_class_student(payload)
                if (class_data.success === true) {
                    let students = class_data.data
                    this.sendResponse(res, success.default, students)
                }
            }
        } catch (err) {
            next(err)
        }
    }

    async create_assignment(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.assigment = req.body;
            let check_user = await ClassV1.check_teacher_class(req.user, payload);
            if (check_user.success == true) {
                let assigment_data = await ClassV1.create_assignment_data(payload, req.user);
                if (assigment_data.success == true) {
                    let assigment_question = payload.assigment;
                    assigment_question.map(async (assgn_question: any) => {
                        let assgn_qstn = await ClassV1.create_assignment_question(assgn_question, assigment_data.data)
                        let assig_qstn_type = assgn_qstn.data
                        if (assig_qstn_type.assigment_question_type === "0") {
                            let assignment_options = assgn_question.options;
                            assignment_options.map(async (assgn_option: any) => {
                                let assgn_opt = await ClassV1.create_assignment_option(assgn_option, assgn_qstn.data)
                                if (assgn_option == assignment_options[assignment_options.length - 1]) {
                                    console.log(assgn_opt)
                                }
                            })

                        } else {
                            let assgn_ans = await ClassV1.create_assignment_answer(assgn_question, assgn_qstn.data)
                            if (assgn_ans.success === true) {
                                console.log(assgn_ans)

                            }
                        }
                        if (assgn_question == assigment_question[assigment_question.length - 1]) {
                            console.log(assgn_qstn)
                            this.sendResponse(res, success.default)
                        }
                    })
                } else {
                    this.sendResponse(res, error.user.user_not_register);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

    async get_assignment(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.assigment = req.body;
            let get_data = await ClassV1.check_teacher_class(req.user, payload);
            if (get_data.success === true) {
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
            } else {
                this.sendResponse(res, error.user.user_not_found)
            }
        } catch (err) {
            next(err)
        }
    }

    async get_assignment_by_class_id(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.assigment = req.body;
            let check_user = await ClassV1.check_teacher_class(req.user, payload)

            if (check_user.success == true) {
                let get_data = await ClassV1.get_assignment(payload);
                if (get_data.success == true) {
                    let assignment_data = get_data.data
                    this.sendResponse(res, success.default, assignment_data)
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