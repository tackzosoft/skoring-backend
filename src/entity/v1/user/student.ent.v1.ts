
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
import User_masterModule from "../../../models/user_master.mod";
import Student_profileModule from "../../../models/student_profile.mod";
import Join_requestModule from "../../../models/join_request_master.mod";
import Accept_requestModule from "../../../models/accept_request_master.mod";
import Create_classModule from "../../../models/class_master.mod";

class StudentEntity extends BaseEntity {
    async register_student_data(payload: any): Promise<any> {
        var user_id = helper.generateRandom("user_id");
        var password_salt = helper.generateRandom("salt");
        var password = helper.generateHash(payload.password, password_salt);
        let student_data = await Student_profileModule.create({
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: password,
            password_salt: password_salt,
            mobile: payload.mobile,
            user_id: user_id,
            profile_image: payload.profile_image,
            profile_type:0,
            DOB: payload.DOB,
            gender: payload.gender,
            parent_mobile: payload.parent_mobile
        }
        )
        if (student_data) {
            
            let register = await User_masterModule.create({
                user_id: user_id,
                profile_image: payload.profile_image,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                mobile: payload.mobile,
                active: 1,
                password: password,
                password_salt: password_salt,
                approved: 1,
                date_created: payload.date_created,
                date_modified: payload.date_modified,
                user_type: 0
            })
            if (register) {
                return { success: true, data: student_data.toJSON() }
            }
        } else {
            return { success: false }
        }
    }

    async check_user(payload: any): Promise<any> {
        let email = payload.email
        let check_user = await User_masterModule.findOne({ where: { email: email } })
        if (check_user) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    async class_requested(payload: any, user: any): Promise<any> {
        var req_id = helper.generateRandom("req_id");
        let join_data = await Join_requestModule.create({
            request_created_by: user.user_id,
            unique_code: payload.unique_code,
            req_id: req_id,
            class_id:payload.class_id
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

    async check_req(payload: any,user:any): Promise<any> {
        // let unique_code = payload.unique_code
        let check_user = await Join_requestModule.findOne({ where: { unique_code: payload.unique_code, request_created_by: user.user_id} })
        if (check_user) {
            return { success: true,data:check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_class(payload: any): Promise<any> {
        // let unique_code = payload.unique_code
        let check_user = await Create_classModule.findOne({ where: { unique_code: payload.unique_code, class_id: payload.class_id} })
        if (check_user) {
            return { success: true,data:check_user.toJSON() }
        } else {
            return { success: false }
        }
    }
}



export default new StudentEntity();