
import BaseEntity from "../../base.ent";
// import { helper } from "../../../services";
import User_masterModule from "../../../models/user_master.mod";
class UserEntity extends BaseEntity {

    async check_user(payload: any): Promise<any> {
        let email = payload.email
        let check_user = await User_masterModule.findOne({ where: { email: email } })
        if (check_user) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    async get_user_details(payload: any): Promise<any> {
        let email = payload.email;
        let user_auth = await User_masterModule.findOne({ where: { email: email } })
        if (user_auth) {
            if (user_auth) {
                return { success: true, data: user_auth.toJSON() }
            }

            else {
                return { success: false }
            }
        }
    }

    async get_user_data_by_user_id(payload: any): Promise<any> {
        let user_id = payload.user_id
        let user_auth = await User_masterModule.findOne({ where: { user_id: user_id } })
        if (user_auth) {
            return { success: true, user_auth_data: user_auth.toJSON() }
        } else {
            return { sucess: false }
        }
    }
}



export default new UserEntity();