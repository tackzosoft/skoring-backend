import { Response, NextFunction } from "express";
import { success, error } from "../../../common";
import BaseCtr from "../base.ctr";
import UserV1 from "../../../entity/v1/user/user.ent.v1";
import UpdProfile from "../../../entity/v1/user/student_profile.ent.v1"


class ProfileCtrClass extends BaseCtr {
    constructor() {
        super()
    }

    async update_student_profile(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            let payload: IUser.Request.Student_profileModule = req.body;
            console.log(req.user);
            let check_user = await UserV1.get_user_data_by_user_id(req.user)
            if (check_user.success === true) {
                let check_user = await UserV1.check_email(payload)
                if (check_user.success === false) {
                    let check_phone = await UserV1.check_phone(payload)
                    if (check_phone.success === false) {
                        let profile_data = await UpdProfile.put_student_profileModule(payload, req.user)
                        if (profile_data.success == true) {
                            this.sendResponse(res, success.default)
                        } else {
                            this.sendResponse(res, error.user.user_not_register);
                        }
                    } else {
                        this.sendResponse(res, error.user.user_already);
                    }
                } else {
                    this.sendResponse(res, error.user.user_already);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }

        } catch (err) {
            next(err)
        }
    }

    async get_student_profile(req: IApp.IRequest, res: Response, next: NextFunction) {
        try {
            // let payload: IUser.Request.Teacher_profileModule = req.body;
            let check_user = await UserV1.get_user_data_by_user_id(req.user);

            if (check_user.success == true) {
                let get_data = await UpdProfile.student_profile(req.user);
                if (get_data.success == true) {
                    let data = get_data.data
                    this.sendResponse(res, success.default, { data })
                } else {
                    this.sendResponse(res, error.user.user_not_found);
                }
            } else {
                this.sendResponse(res, error.user.user_not_register);
            }
        } catch (err) {
            next(err)
        }
    }
}
export const profileCtrV1 = new ProfileCtrClass();