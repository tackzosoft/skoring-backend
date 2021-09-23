import { Router } from "express";
import { celebrate } from "celebrate";
// import auth from "../../../middleware/auth";
import { validation } from "../../../common";
import { teacherCtrV1 } from "../../../controllers/v1/teacher/teacher.ctr";

export default function (router: Router) {
    

    router.post(
        "/register_teacher",
        celebrate({
            body: {
                email: validation.teacher.email,
                mobile: validation.teacher.mobile,
                password: validation.teacher.password,
                first_name: validation.teacher.first_name,
                last_name: validation.teacher.last_name,
                profile_image: validation.teacher.profile_image,
                DOB: validation.teacher.DOB,
                gender: validation.teacher.gender,
                qualification: validation.teacher.qualification
            }
        }),
        (req, res, next) => {
            teacherCtrV1.register_teacher(req, res, next);
        }
    );
    return router;
}
