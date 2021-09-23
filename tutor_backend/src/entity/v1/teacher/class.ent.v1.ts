
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
// import User_masterModule from "../../../models/user_master.mod";
import Create_classModule from "../../../models/class_master.mod";
import Join_classModule from "../../../models/join_request_master.mod";
import Accept_requestModule from "../../../models/accept_request_master.mod";

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
            return { success: true, data: class_data.unique_code }
        } else {
            return { success: false }
        }

    }

    async class_requested(payload: any, user: any): Promise<any> {
        var req_id = helper.generateRandom("req_id");
        let join_data = await Join_classModule.create({
            request_created_by: user.user_id,
            unique_code: payload.unique_code,
            req_id: req_id
        })
        if (join_data) {
            let accept_data = await Accept_requestModule.create({
                req_id: req_id,
                active:1
            })
            if (accept_data) {
                return { success: true, data: join_data.toJSON() }
            }else{
                return { success: false }
            }

        } else {
            return { success: false }
        }

    }

    async accepted_request(payload: any, user: any): Promise<any> {
        //var req_id = helper.generateRandom("req_id");
        let join_data = await Accept_requestModule.update({
            request_accepted_by: user.user_id,
            active:payload.active,
            approved: payload.approved,
        },
        {where:{active:1}})
        if (join_data) {
            return { success: true, data: join_data }
        } else {
            return { success: false }
        }

    }

    async check_req(payload: any): Promise<any> {
        let unique_code = payload.unique_code
        let check_user = await Join_classModule.findOne({ where: { unique_code: unique_code } })
        if (check_user) {
            return { success: true,data:check_user.toJSON() }
        } else {
            return { success: false }
        }
    }
}



export default new ClassEntity();