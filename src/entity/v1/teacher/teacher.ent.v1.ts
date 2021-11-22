
import BaseEntity from "../../base.ent";
import { helper } from "../../../services";
import User_masterModule from "../../../models/user_master.mod";
import Teacher_profileModule from "../../../models/teacher_profile.mod";

class TeacherEntity extends BaseEntity {

    async register_teacher_data(payload: any): Promise<any> {
        var user_id = helper.generateRandom("user_id");
        var password_salt = helper.generateRandom("salt");
        var password = helper.generateHash(payload.password, password_salt);
        let teacher_data = await Teacher_profileModule.create({
            user_id: user_id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: password,
            password_salt: password_salt,
            mobile: payload.mobile,
            profile_image: payload.profile_image,
            date_created: payload.date_created,
            qualification: payload.qualification,
            DOB: payload.DOB,
            gender: payload.gender,
            profile_type: 1,
            active: 0,
            approved: 0,
        })
        if (teacher_data) {

            let register = await User_masterModule.create({
                user_id: user_id,
                profile_image: payload.profile_image,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: password,
                password_salt: password_salt,
                mobile: payload.mobile,
                active: 0,
                approved: 0,
                date_created: payload.date_created,
                date_modified: payload.date_modified,
                user_type: 1
            })
            if (register) {
                return { success: true, data: teacher_data.toJSON() }
            } else {
                return { success: false }
            }
        }

    }
}



export default new TeacherEntity();