
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
// import User_masterModule from "../../../models/user_master.mod";
import Create_classModule from "../../../models/class_master.mod";
import Join_classModule from "../../../models/join_request_master.mod";
import Accept_requestModule from "../../../models/accept_request_master.mod";
import Class_studentModule from "../../../models/class_student_master.mod";

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
            return { success: true, class_code: class_data.unique_code,class_id }
        } else {
            return { success: false }
        }

    }

    async accepted_request(payload: any, user: any): Promise<any> {
        let join_data = await Accept_requestModule.update({
            request_accepted_by: user.user_id,
            active:payload.active,
            approved: payload.approved,
            unique_code:payload.unique_code
        },
        {where:{req_id:payload.req_id}})
        if (join_data) { 
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async class_student( req:any): Promise<any> {
        let class_data = await Class_studentModule.create({
            student_id: req.request_created_by,
            class_id: req.class_id
        })
        if (class_data) {
            return { success: true, data: class_data.toJSON() }
        } else {
            return { success: false }
        }

    }

    async check_req(payload: any): Promise<any> {
        let req_id = payload.req_id
        let check_user = await Join_classModule.findOne({ where: { req_id: req_id , unique_code: payload.unique_code } })
        if (check_user) {
            return { success: true,data:check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_student(req:any):Promise<any>{
        let student_id = req.request_created_by
        let check_user = await Class_studentModule.findOne({ where: { student_id: student_id} })
        if (check_user) {
            return { success: true,data:check_user.toJSON() }
        } else {
            return { success: false }
        }
    }
}



export default new ClassEntity();