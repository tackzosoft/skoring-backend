import BaseEntity from "../../base.ent";
import Student_profileModule from "../../../models/student_profile.mod";
import User_masterModule from "../../../models/user_master.mod";


class ProfileEntity extends BaseEntity {
    async put_student_profileModule(payload: any, user: any): Promise<any> {
        let profile_data = await Student_profileModule.update({

            profile_image: payload.profile_image,
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            mobile: payload.mobile,
            parent_mobile: payload.parent_mobile,
            DOB: payload.DOB,
            class: payload.class

        },
            { where: { user_id: user.user_id } }
        )
        if (profile_data) {
            let register = await User_masterModule.update({
                profile_image: payload.profile_image,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                mobile: payload.mobile
            },
                { where: { user_id: user.user_id } })
            if (register) {
                return { success: true }

            }
        }
        else {
            return { success: false }
        }
    }

    async student_profile(user: any): Promise<any> {
        let email = user.email
        let profile = await Student_profileModule.findOne({ where: { email: email } })
        if (profile) {

            return { success: true, data: profile.toJSON() }
        }
        else {
            return { success: false }

        }
    }
}
export default new ProfileEntity();