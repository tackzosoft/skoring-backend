import { Router } from "express";
import { celebrate } from "celebrate";
import auth from "../../../middleware/auth";
import { validation } from "../../../common";
import { classCtrV1 } from "../../../controllers/v1/teacher/class.ctr";

export default function (router: Router) {

    router.post(
        "/create_class", auth,
        celebrate({
            body: {
                class: validation.create.class,
                subject: validation.create.subject
            },
        }),
        (req, res, next) => {
            classCtrV1.create_class(req, res, next);
        }
    );

    router.get(
        "/get_class", auth,
        (req, res, next) => {
            classCtrV1.get_class(req, res, next);
        }
    );

    router.post(
        "/get_request", auth,
        celebrate({
            body: {
                class_id: validation.join.class_id
            },
        }),
        (req, res, next) => {
            classCtrV1.get_request(req, res, next);
        }
    );

    router.post(
        "/get_class_student", auth,
        celebrate({
            body: {
                class_id: validation.join.class_id
            },
        }),
        (req, res, next) => {
            classCtrV1.get_class_student(req, res, next);
        }
    );

    router.post(
        "/remove_student", auth,
        celebrate({
            body: {
                student_id: validation.remove.student_id,
                req_id: validation.remove.req_id
            },
        }),
        (req, res, next) => {
            classCtrV1.remove_student(req, res, next);
        }
    );

    router.post(
        "/accept_request", auth,
        celebrate({
            body: {
                req_id: validation.accept.req_id,
                approved: validation.accept.approved
            },
        }),
        (req, res, next) => {
            classCtrV1.accept_request(req, res, next);
        }
    );

    router.post(
        "/invite_student", auth,
        celebrate({
            body: {
                student_id: validation.invite_student.student_id,
                class_id: validation.invite_student.class_id
            }
        }),
        (req, res, next) => {
            classCtrV1.add_student(req, res, next)
        }
    );
    router.post(
        "/attendence", auth,
        celebrate({
            body: {
                class_id: validation.invite_student.class_id,
                students: validation.invite_student.students,
                attendence_date: validation.invite_student.attendence_date
            }
        }),
        (req, res, next) => {
            classCtrV1.student_attendence(req, res, next)
        }
    );

    router.post(
        "/get_attendence", auth,
        celebrate({
            body: {
                class_id: validation.invite_student.class_id,
                attendence_date: validation.invite_student.attendence_date
            }
        }),
        (req, res, next) => {
            classCtrV1.get_attendence(req, res, next)
        }
    );

    router.post(
        "/create_assignment", auth,
        celebrate({
            body: {
                student_id: validation.assignment.student_id,
                class_id: validation.assignment.class_id,
                dead_line: validation.assignment.dead_line,
                assigment: validation.assignment.assigment,
                assigment_type: validation.assignment.assigment_type,
                assigment_file: validation.assignment.assigment_file
            }
        }),
        (req, res, next) => {
            classCtrV1.create_assignment(req, res, next)
        }
    );

    router.post(
        "/get_assignment", auth,
        celebrate({
            body: {
                class_id: validation.assignment.class_id,
            }
        }),
        (req, res, next) => {
            classCtrV1.get_assignment(req, res, next)
        }
    );

    return router;
}
