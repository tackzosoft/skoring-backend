
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
// import User_masterModule from "../../../models/user_master.mod";
import Create_classModule from "../../../models/class_master.mod";
import Join_classModule from "../../../models/join_request_master.mod";
import Class_studentModule from "../../../models/class_student_master.mod";
import Join_requestModule from "../../../models/join_request_master.mod";
import Add_student_requestModule from "../../../models/add_student_request_master.mod";
import Attendence_masterModule from "../../../models/attendence_master.mod";

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
            { where: { req_id: payload.req_id } })
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async accept_request(payload: any): Promise<any> {
        let join_data = await Join_requestModule.update({
            status: 1,
        },
            { where: { request_created_by: payload.student_id, class_id: payload.class_id } })
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }
    async rejected_request(payload: any): Promise<any> {
        let join_data = await Join_requestModule.update({
            status: 2,
        },
            { where: { req_id: payload.req_id } })
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
            { where: { req_id: req.req_id, student_id: req.request_created_by } })
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
            req_id: req.req_id,
            active: 1
        })
        if (class_data) {
            return { success: true, data: class_data.toJSON() }
        } else {
            return { success: false }
        }

    }

    async add_student_request(payload: any, user: any): Promise<any> {
        var req_id = helper.generateRandom("req_id");
        let class_data = await Add_student_requestModule.create({
            student_id: payload.student_id,
            class_id: payload.class_id,
            req_id: req_id,
            status: 0,
            request_created_by: user.user_id,
            active: 1
        })
        if (class_data) {
            return { success: true, data: class_data.toJSON() }
        } else {
            return { success: false }
        }

    }

    async student_attendence(student: any, payload: any, user: any): Promise<any> {
        var attendence_id = helper.generateRandom("attendence_id");
        let student_data = await Attendence_masterModule.create({
            student_id: student.student_id,
            class_id: payload.class_id,
            teacher_id: user.user_id,
            attendence: student.attendence,
            attendence_id: attendence_id,
            attendence_date: payload.attendence_date
        })
        if (student_data) {
            return { success: true, data: student_data.toJSON() }
        } else {
            return { success: false }
        }

    }

    async update_student_attendence(student: any, payload: any): Promise<any> {
        let join_data = await Class_studentModule.update({
            attendence: payload.attendence
        },
            { where: { student_id: student.student_id, class_id: payload.class_id } })
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async get_student_attendence(payload: any, user: any): Promise<any> {
        let class_id = payload.class_id
        let check_user = await Attendence_masterModule.findAll({ where: { class_id: class_id, attendence_date: payload.attendence_date, teacher_id: user.user_id }, raw: true })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async removed_student(payload: any): Promise<any> {
        let join_data = await Class_studentModule.update({
            active: 0,
        },
            { where: { student_id: payload.student_id, req_id: payload.req_id } })
        if (join_data) {
            return { success: true, data: join_data }
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
        let check_user = await Class_studentModule.findAll({ where: { class_id: class_id, active: 1 }, attributes: ["student_id", "req_id", "class_id", "name", "profile_image"] })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async get_class_student(payload: any): Promise<any> {
        let class_id = payload.class_id
        let check_user = await Class_studentModule.findAll({ where: { class_id: class_id, active: 1 }, attributes: ["student_id", "class_id", "name", "profile_image"] })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async get_requests(payload: any): Promise<any> {
        let class_id = payload.class_id
        let check_user = await Join_requestModule.findAll({ where: { class_id: class_id, status: 0 } })
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

    async check_students(payload: any): Promise<any> {
        let student_id = payload.student_id
        let check_user = await Class_studentModule.findOne({ where: { student_id: student_id, req_id: payload.req_id } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_available_students(payload: any): Promise<any> {
        let request_created_by = payload.student_id
        let check_user = await Join_requestModule.findOne({ where: { request_created_by: request_created_by, class_id: payload.class_id } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_student(req: any): Promise<any> {
        let student_id = req.request_created_by
        let check_user = await Class_studentModule.findOne({ where: { student_id: student_id, req_id: req.req_id, active: 1 } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_student_attendence(students: any, payload: any): Promise<any> {
        let check_user = await Class_studentModule.findOne({ where: { student_id: students.student_id, class_id: payload.class_id } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_attendence(payload: any): Promise<any> {
        console.log(payload.attendence_date)
        let check_user = await Attendence_masterModule.findAll({ where: { attendence_date!: payload.attendence_date, class_id: payload.class_id }, raw: true })
        if (check_user) {
            return { success: true, data: check_user }
        } else {
            return { success: false }
        }
    }

    async check_invited_student(payload: any): Promise<any> {
        let student_id = payload.student_id
        let check_user = await Add_student_requestModule.findOne({ where: { student_id: student_id, class_id: payload.class_id } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async available_student(req: any): Promise<any> {
        let student_id = req.request_created_by
        let check_user = await Class_studentModule.findOne({ where: { student_id: student_id, req_id: req.req_id, active: 0 } })
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