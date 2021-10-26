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
                let chapter_data = await SyllabusV1.update_topic_data(payload)
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
}
export const syllabusCtrV1 = new SyllabusCtrClass();