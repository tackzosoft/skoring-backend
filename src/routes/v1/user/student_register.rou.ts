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

    router.get(
        "/get_assignment_list_student", auth,
        (req, res, next) => {
            studentCtrV1.get_assignment_list_student(req, res, next);
        }
    );

    router.post(
        "/submit_assigment", auth,
        celebrate({
            body: {
                // assigment_answer: validation.submit_assignment.assigment_answer,
                assigment_id: validation.submit_assignment.assigment_id,
                assignment: validation.submit_assignment.assignment,
                // date_submit: validation.submit_assignment.date_submit,
                file: validation.submit_assignment.file,
            },
        }),
        (req, res, next) => {
            studentCtrV1.submit_assigment(req, res, next);
        }
    );

    router.get(
        "/get_submited_assignment", auth,
        (req, res, next) => {
            studentCtrV1.get_submited_assignment(req, res, next);
        }
    );

    return router;
}
