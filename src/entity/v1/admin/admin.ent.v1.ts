
import BaseEntity from "../../base.ent";
// import { helper } from "../../../services";
import User_masterModule from "../../../models/user_master.mod";
import Student_profileModule from "../../../models/student_profile.mod";
import Teacher_profileModule from "../../../models/teacher_profile.mod";
// import { userInfo } from "os";
class AdminEntity extends BaseEntity {

    async check_user(payload: any): Promise<any> {
        let email = payload.email
        let check_user = await User_masterModule.findOne({ where: { email: email, user_type: 2 } })
        if (check_user) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    async check_admin(user: any): Promise<any> {
        // let email = payload.email
        let check_user = await User_masterModule.findOne({ where: { user_id: user.user_id, user_type: 2 } })
        if (check_user) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    async check_email(payload: any): Promise<any> {
        let email = payload.email
        let check_user = await User_masterModule.findOne({ where: { email: email } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async check_phone(payload: any): Promise<any> {
        let mobile = payload.mobile
        let check_user = await User_masterModule.findOne({ where: { mobile: mobile } })
        if (check_user) {
            return { success: true, data: check_user.toJSON() }
        } else {
            return { success: false }
        }
    }

    async get_user_details(payload: any): Promise<any> {
        let email = payload.email;
        let user_auth = await User_masterModule.findOne({ where: { email: email, user_type: 2 } })
        if (user_auth) {

            return { success: true, data: user_auth.toJSON() }
        }

        else {
            return { success: false }

        }
    }

    async get_users(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await User_masterModule.findAll({ where: { user_type: payload.user_type, approved: 0 }, raw: true })
        if (user_auth) {
            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }
    }

    async approved_user(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await User_masterModule.update({
            approved: payload.approved,
            active: 1
        },
            { where: { user_type: payload.user_type, user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async approved_student(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await Student_profileModule.update({
            approved: payload.approved,
            active: 1
        },
            { where: { user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async approved_teacher(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await Teacher_profileModule.update({
            approved: payload.approved,
            active: 1
        },
            { where: { user_type: payload.user_type, user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async remove_user(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await User_masterModule.update({
            approved: payload.approved,
            active: 2
        },
            { where: { user_type: payload.user_type, user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async remove_student(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await Student_profileModule.update({
            approved: payload.approved,
            active: 2
        },
            { where: { user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async remove_teacher(payload: any): Promise<any> {
        // let email = payload.email;
        let user_auth = await Teacher_profileModule.update({
            approved: payload.approved,
            active: 2
        },
            { where: { user_type: payload.user_type, user_id: payload.user_id } })
        if (user_auth) {

            return { success: true, data: user_auth }
        }

        else {
            return { success: false }
        }

    }

    async get_students_list(): Promise<any> {
        let user_auth = await User_masterModule.findAll({ where: { user_type: 0, active: 1 }, raw: true })
        if (user_auth) {
            return { success: true, user_auth_data: user_auth }
        } else {
            return { sucess: false }
        }
    }

    async get_teachers_list(): Promise<any> {
        let user_auth = await User_masterModule.findAll({ where: { user_type: 1, active: 1 }, raw: true })
        if (user_auth) {
            return { success: true, user_auth_data: user_auth }
        } else {
            return { sucess: false }
        }
    }

    async get_inactive_students_list(): Promise<any> {
        let user_auth = await User_masterModule.findAll({ where: { user_type: 0, active: 0 }, raw: true })
        if (user_auth) {
            return { success: true, user_auth_data: user_auth }
        } else {
            return { sucess: false }
        }
    }

    async get_inactive_teachers_list(): Promise<any> {
        let user_auth = await User_masterModule.findAll({ where: { user_type: 1, active: 0 }, raw: true })
        if (user_auth) {
            return { success: true, user_auth_data: user_auth }
        } else {
            return { sucess: false }
        }
    }
}



export default new AdminEntity();