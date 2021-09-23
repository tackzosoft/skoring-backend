import { Router } from "express";
import { celebrate } from "celebrate";
import auth from "../../../middleware/auth"
import { validation } from "../../../common";
import { profileCtrV1 } from "../../../controllers/v1/teacher/teacher_profile.ctr"

export default function (router: Router) {
    router.put(
        "/update_teacher_profile", auth,
        celebrate({
            body: {
                profile_image: validation.teacher.profile_image,
                first_name: validation.teacher.first_name,
                last_name: validation.teacher.last_name,
                email: validation.teacher.email,
                mobile: validation.teacher.mobile,
                DOB: validation.teacher.DOB,
                qualification: validation.teacher.qualification
            }
        }),
        (req, res, next) => {
            profileCtrV1.update_teacher_profile(req, res, next);
        }
    );

    router.get(
        "/get_teacher_profile", auth,
        (req, res, next) => {
            profileCtrV1.get_teacher_profile(req, res, next);
        }
    );
    return router;
}