import { Response, NextFunction } from "express";
import { success, error } from "../../../common";
import BaseCtr from "../base.ctr";
import SyllabusV1 from "../../../entity/v1/teacher/syllabus.ent.v1";
// import UpdProfile from "../../../entity/v1/teacher/teacher_profile.ent.v1"


class SyllabusCtrClass extends BaseCtr {
    constructor() {
        super()
    }

    async create_chapter(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_user = await SyllabusV1.check_teacher(req.user, payload)
            if (check_user.success === true) {
                let chapter_data = await SyllabusV1.create_chapter_data(payload, req.user)
                if (chapter_data.success == true) {
                    this.sendResponse(res, success.default)
                } else {
                    this.sendResponse(res, error.user.user_not_register);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async create_topic(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_topic = req.body;
            let check_user = await SyllabusV1.check_teacher(req.user, payload)
            if (check_user.success === true) {
                let check_chapter = await SyllabusV1.check_chapter(payload)
                if (check_chapter.success === true) {
                    let topic_data = payload.topics
                    // console.log(topic_data)
                    topic_data.map(async (topic_chp: any) => {
                        let create_topic_data = await SyllabusV1.create_topic_data(topic_chp, check_chapter.data)
                        if (topic_chp == topic_data[topic_data.length - 1]) {
                            console.log(create_topic_data)
                            this.sendResponse(res, success.default)
                        }
                    }
                    )
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async get_chapter(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_chapter = await SyllabusV1.check_teacher(req.user, payload);
            if (check_chapter.success == true) {
                let get_data = await SyllabusV1.get_chapter(payload);
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

    async get_all_chapter(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {

            let check_chapter = await SyllabusV1.check_teacher_chapter(req.user);
            if (check_chapter.success == true) {
                let data = check_chapter.data
                this.sendResponse(res, success.default, data)
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }

    async get_task(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let task_data = await SyllabusV1.task_chapter(payload, req.user);
            if (task_data.length !== 0) {
                // console.log("1")
                let topic_task = await SyllabusV1.task_topic(payload, req.user)
                if (topic_task.length !== 0) {
                    let chapter_data = task_data.data
                    let topic_data = topic_task.data
                    this.sendResponse(res, success.default, { chapter_data, topic_data })
                } else {
                    this.sendResponse(res, error.user.task_not_found)
                }
            } else {
                this.sendResponse(res, error.user.task_not_found)
            }
        } catch (err) {
            next(err)
        }
    }

    async edit_chapter(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_user = await SyllabusV1.check_chapters(payload, req.user)
            if (check_user.success === true) {
                let chapter_data = await SyllabusV1.update_chapter_data(payload)
                if (chapter_data.success == true) {
                    this.sendResponse(res, success.default)
                } else {
                    this.sendResponse(res, error.user.user_not_register);
                }
            } else {
                this.sendResponse(res, error.user.chapter_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async assign_chapter_month(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_user = await SyllabusV1.check_class(payload, req.user)
            if (check_user.success === true) {
                let chapters_data = payload.chapters;
                chapters_data.map(async (list_of_chp: any) => {
                    let chapter_data = await SyllabusV1.assingn_month_to_chapter(list_of_chp, payload)
                    if (list_of_chp == chapters_data[chapters_data.length - 1]) {
                        console.log(chapter_data)
                        this.sendResponse(res, success.default)
                    }
                })
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async delete_chapter(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_chapter = req.body;
            let check_user = await SyllabusV1.check_chapters(payload, req.user)
            if (check_user.success === true) {
                let chapter_data = await SyllabusV1.delete_chapter_data(payload)
                if (chapter_data.success == true) {
                    this.sendResponse(res, success.default)
                } else {
                    this.sendResponse(res, error.user.user_not_register);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async get_topic(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.add_topic = req.body;
            let check_chapter = await SyllabusV1.check_chapters(payload, req.user);
            if (check_chapter.success == true) {
                let get_data = await SyllabusV1.get_topic(payload);
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

    async edit_topic(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.edit_topic = req.body;
            let check_user = await SyllabusV1.check_chapters(payload, req.user)
            if (check_user.success === true) {
                let check_topic = await SyllabusV1.check_topic(payload, req.user)
                if (check_topic.success === true) {
                    let chapter_data = await SyllabusV1.update_topic_data(payload)
                    if (chapter_data.success == true) {
                        this.sendResponse(res, success.default)
                    } else {
                        this.sendResponse(res, error.user.user_not_register);
                    }
                } else {
                    this.sendResponse(res, error.user.topic_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async delete_topic(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.edit_topic = req.body;
            console.log(payload)
            let check_user = await SyllabusV1.check_chapters(payload, req.user)
            if (check_user.success === true) {
                let check_topic = await SyllabusV1.check_topic(payload, req.user)
                if (check_topic.success === true) {
                    let topic_delete = await SyllabusV1.delete_topic_data(payload)
                    if (topic_delete.success == true) {
                        this.sendResponse(res, success.default)
                    } else {
                        this.sendResponse(res, error.user.user_not_register);
                    }
                } else {
                    this.sendResponse(res, error.user.topic_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }

    async assign_date_topic(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.edit_topic = req.body;
            let check_user = await SyllabusV1.check_chapters(payload, req.user)
            if (check_user.success === true) {
                let check_topic_date = await SyllabusV1.check_topic_date(payload)
                if (check_topic_date.success === true) {
                    let chapter_data = await SyllabusV1.assign_date_topic_data(payload)
                    if (chapter_data.success == true) {
                        this.sendResponse(res, success.default)
                    } else {
                        this.sendResponse(res, error.user.user_not_register);
                    }
                } else {
                    this.sendResponse(res, error.user.topic_already);
                }
            } else {
                this.sendResponse(res, error.user.user_not_found);
            }

        } catch (err) {
            next(err)
        }
    }
}
export const syllabusCtrV1 = new SyllabusCtrClass();