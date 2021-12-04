import BaseEntity from "../../base.ent";
import Create_classModule from "../../../models/class_master.mod";
import Chapter_masterModule from "../../../models/chapter_master.mod";
import { helper } from "../../../services";
import Topic_masterModule from "../../../models/topic_master.mod";
import { Op } from "../../../../node_modules/sequelize";
// import moment from "moment";

class SyllabusEntity extends BaseEntity {
    async create_chapter_data(payload: any, user: any): Promise<any> {
        let chp_id = helper.generateRandom("chp_id")
        let chapter_data = await Chapter_masterModule.create({
            chp_id: chp_id,
            chapter_name: payload.chapter_name,
            class_id: payload.class_id,
            created_by: user.user_id,
            month: "",
            active: 1,
            progress: "0"
        })
        if (chapter_data) {
            return { success: true, data: chapter_data.toJSON() }
        } else {
            return { success: false }
        }
    }

    async create_topic_data(payload: any, user: any): Promise<any> {
        let topic_id = helper.generateRandom("topic_id")
        // let topic_data = payload.topic_data
        // console.log(payload.create_topic_data)
        let chapter_data = await Topic_masterModule.create({
            chp_id: user.chp_id,
            topic_id: topic_id,
            topic_name: payload.topic_name,
            class_id: payload.class_id,
            created_by: user.created_by,
            start_date: "0001-01-01",
            end_date: "0001-01-01",
            active: 1,
        })
        if (chapter_data) {
            return { success: true, data: chapter_data.toJSON() }
        } else {
            return { success: false }
        }
    }


    async check_teacher(user: any, payload: any): Promise<any> {
        let user_id = user.user_id
        let profile = await Create_classModule.findOne({ where: { created_by: user_id, class_id: payload.class_id } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async check_teacher_chapter(user: any): Promise<any> {
        let user_id = user.user_id
        let profile = await Chapter_masterModule.findAll({ where: { created_by: user_id, active: 1 }, attributes: ["chp_id", "chapter_name", "month"] })
        if (profile) {

            return { success: true, data: profile }
        }
        else {
            return { success: false }

        }
    }

    async check_chapter(payload: any): Promise<any> {
        let chp_id = payload.chp_id
        let profile = await Chapter_masterModule.findOne({ where: { chp_id: chp_id, class_id: payload.class_id } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async task_chapter(payload: any, user: any): Promise<any> {
        let chapter: any = await Chapter_masterModule.findAll({ where: { end_date: { [Op.gte]: payload.date }, start_date: { [Op.lte]: payload.date }, created_by: user.user_id }, attributes: ["chp_id", "month", "start_date", "end_date", "chapter_name", "class_id", "progress"], raw: true })
        if (chapter) {
            // profile.chp_id
            let topic = await Topic_masterModule.findAll({ where: { end_date: { [Op.gte]: payload.date }, start_date: { [Op.lte]: payload.date }, created_by: user.user_id }, attributes: ["chp_id", "start_date", "end_date", "topic_name", "topic_id"], raw: true })
            if (topic) {
                // profile["Topics"] = topic
                // console.log(profile)
                return { success: true, data: { chapter, topic } }
            }
        }
        else {
            return { success: false }

        }
    }

    async task_topic(chp: any, payload: any): Promise<any> {

    }

    async check_chapters(payload: any, user: any): Promise<any> {
        let chp_id = payload.chp_id
        let profile = await Chapter_masterModule.findOne({ where: { chp_id: chp_id, created_by: user.user_id, active: 1 } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async check_class(payload: any, user: any): Promise<any> {
        let class_id = payload.class_id
        let profile = await Create_classModule.findOne({ where: { class_id: class_id, created_by: user.user_id } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async check_topic(payload: any, user: any): Promise<any> {
        let topic_id = payload.topic_id
        let profile = await Topic_masterModule.findOne({ where: { topic_id: topic_id, created_by: user.user_id, active: 1 } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async check_topic_date(payload: any): Promise<any> {
        let topic_id = payload.topic_id
        let profile = await Topic_masterModule.findOne({ where: { topic_id: topic_id, start_date!: "0001-01-01", active: 1 } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async check_month(payload: any): Promise<any> {
        let chp_id = payload.chp_id
        let profile = await Chapter_masterModule.findOne({ where: { chp_id: chp_id, month: 0 } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }

    async get_chapter(payload: any): Promise<any> {
        // let chp_id = payload.chp_id
        let profile = await Chapter_masterModule.findAll({ where: { class_id: payload.class_id, active: 1 }, raw: true })
        if (profile) {

            return { success: true, data: profile }
        }
        else {
            return { success: false }

        }
    }

    // async get_all_chapter(payload: any): Promise<any> {
    //     // let chp_id = payload.chp_id
    //     let profile = await Chapter_masterModule.findAll({ where: { class_id: payload.class_id }, raw: true })
    //     if (profile) {

    //         return { success: true, data: profile }
    //     }
    //     else {
    //         return { success: false }

    //     }
    // }

    async get_topic(payload: any): Promise<any> {
        // let chp_id = payload.chp_id
        let profile = await Topic_masterModule.findAll({ where: { chp_id: payload.chp_id, active: 1 }, raw: true })
        if (profile) {

            return { success: true, data: profile }
        }
        else {
            return { success: false }

        }
    }

    async update_chapter_data(payload: any): Promise<any> {
        let chapter_data = await Chapter_masterModule.update({
            chapter_name: payload.chapter_name,
        },
            { where: { chp_id: payload.chp_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }

    async update_chapter_progress(payload: any): Promise<any> {
        let chapter_data = await Chapter_masterModule.update({
            progress: payload.progress,
        },
            { where: { chp_id: payload.chp_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }

    async assingn_month_to_chapter(list_of_chp: any, payload: any): Promise<any> {
        let chapters_list = list_of_chp.chp_id
        let chapter_data = await Chapter_masterModule.update({
            month: payload.month,
            start_date: list_of_chp.start_date,
            end_date: list_of_chp.end_date
        },
            { where: { chp_id: chapters_list, class_id: payload.class_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }

    async delete_chapter_data(payload: any): Promise<any> {
        let chapter_data = await Chapter_masterModule.update({
            active: 0,
        },
            { where: { chp_id: payload.chp_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }



    async update_topic_data(payload: any): Promise<any> {
        let chapter_data = await Topic_masterModule.update({
            topic_name: payload.topic_name,
        },
            { where: { topic_id: payload.topic_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }

    async delete_topic_data(payload: any): Promise<any> {
        // console.log(payload)
        let chapter_data = await Topic_masterModule.update({
            active: 0
        },
            { where: { topic_id: payload.topic_id, chp_id: payload.chp_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }

    async assign_date_topic_data(payload: any): Promise<any> {
        let chapter_data = await Topic_masterModule.update({
            start_date: payload.start_date,
            end_date: payload.end_date
        },
            { where: { topic_id: payload.topic_id } })
        if (chapter_data) {
            return { success: true, data: chapter_data }
        } else {
            return { success: false }
        }
    }
}
export default new SyllabusEntity();