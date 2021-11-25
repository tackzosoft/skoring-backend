import { Router } from "express";
import { celebrate } from "celebrate";
// import auth from "../../../middleware/auth";
import { validation } from "../../../common";
import { studentCtrV1 } from "../../../controllers/v1/user/student.ctr";
import auth from "../../../middleware/auth";

export default function (router: Router) {

    router.post(
        "/register_student",
        celebrate({
            body: {
                email: validation.student.email,
                mobile: validation.student.mobile,
                password: validation.student.password,
                first_name: validation.student.first_name,
                last_name: validation.student.last_name,
                profile_image: validation.student.profile_image,
                DOB: validation.student.DOB,
                gender: validation.student.gender,
                parent_mobile: validation.student.parent_mobile,
            }
        }),
        (req, res, next) => {
            studentCtrV1.register_student(req, res, next);
        }
    );

    router.post(
        "/join_class", auth,
        celebrate({
            body: {
                unique_code: validation.join.unique_code,
            },
        }),
        (req, res, next) => {
            studentCtrV1.join_class(req, res, next);
        }
    );

    router.get(
        "/get_joined_class", auth,
        (req, res, next) => {
            studentCtrV1.get_joined_class(req, res, next);
        }
    );

    router.post(
        "/get_task_for_student", auth,
        celebrate({
            body: {
                date: validation.chapter.date,
            },
        }),
        (req, res, next) => {
            studentCtrV1.get_task_for_student(req, res, next);
        }
    );


    return router;
}
