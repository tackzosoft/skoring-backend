import { Router } from "express";
import { celebrate } from "celebrate";
import auth from "../../../middleware/auth"
import { validation } from "../../../common";
import { profileCtrV1 } from "../../../controllers/v1/user/student_profile.ctr"

export default function (router: Router) {
    router.put(
        "/update_student_profile", auth,
        celebrate({
            body: {
                profile_image: validation.student.profile_image,
                first_name: validation.student.first_name,
                last_name: validation.student.last_name,
                email: validation.student.email,
                mobile: validation.student.mobile,
                parent_mobile: validation.student.parent_mobile,
                DOB: validation.student.DOB
            }
        }),
        (req, res, next) => {
            profileCtrV1.update_student_profile(req, res, next);
        }
    );

    router.get(
        "/get_student_profile", auth,
        (req, res, next) => {
            profileCtrV1.get_student_profile(req, res, next);
        }
    );
    return router;
}