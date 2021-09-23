
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
import User_masterModule from "../../../models/user_master.mod";
import Student_profileModule from "../../../models/student_profile.mod";

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
}



export default new StudentEntity();