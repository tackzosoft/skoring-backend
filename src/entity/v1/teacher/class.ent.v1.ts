
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
// import User_masterModule from "../../../models/user_master.mod";
import Create_classModule from "../../../models/class_master.mod";
import Join_classModule from "../../../models/join_request_master.mod";
import Class_studentModule from "../../../models/class_student_master.mod";
import Join_requestModule from "../../../models/join_request_master.mod";

class ClassEntity extends BaseEntity {

    async class_created(payload: any, user: any): Promise<any> {
        var unique_code = helper.generateRandom("unique_code");
        var class_id = helper.generateRandom("class_id");
        let class_data = await Create_classModule.create({
            created_by: user.user_id,
            class: payload.class,
            subject: payload.subject,
            unique_code: unique_code,
            class_id: class_id
        })
        if (class_data) {
            return { success: true, class_code: class_data.unique_code, class_id }
        } else {
            return { success: false }
        }

    }

    async accepted_request(payload: any): Promise<any> {
        let join_data = await Join_requestModule.update({
            status: 1,
        },
        {where:{req_id: payload.req_id}})
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async rejected_request(payload: any, user: any): Promise<any> {
        let join_data = await Join_requestModule.update({
            status: 2,
        },
        {where:{req_id: payload.req_id}})
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async accepted_again(req: any): Promise<any> {
        let join_data = await Class_studentModule.update({
            active: 1,
        },
        {where:{req_id: req.req_id,student_id :req.request_created_by}})
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async class_student(req: any): Promise<any> {
        let class_data = await Class_studentModule.create({
            student_id: req.request_created_by,
            class_id: req.class_id,
            name: req.name,
            profile_image: req.profile_image,
            req_id:req.req_id,
            active:1
        })
        if (class_data) {
            return { success: true, data: class_data.toJSON() }
        } else {
            return { success: false }
        }

    }

    async get_classes(user: any): Promise<any> {
        let created_by = user.user_id
        let check_user = await Create_classModule.findAll({ where: { created_by: created_by } })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async get_classes_student(payload: any): Promise<any> {
        let class_id = payload.class_id
        let check_user = await Class_studentModule.findAll({ where: { class_id: class_id , active:1 } ,attributes:["student_id","class_id","name","profile_image"]})
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async get_requests(payload: any): Promise<any> {
        let class_id = payload.class_id
        let check_user = await Join_requestModule.findAll({ where: { class_id: class_id , status:0 } })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async check_req(payload: any): Promise<any> {
        let req_id = payload.req_id
        let check_user = await Join_classModule.findOne({ where: { req_id: req_id } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_student(req: any): Promise<any> {
        let student_id = req.request_created_by
        let check_user = await Class_studentModule.findOne({ where: { student_id: student_id, req_id:req.req_id ,active:1} })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_teacher(user: any): Promise<any> {
        let created_by = user.user_id
        let check_user = await Create_classModule.findOne({ where: { created_by: created_by } })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }
}



export default new ClassEntity();