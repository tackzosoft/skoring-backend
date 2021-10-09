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

    // router.post(
    //     "/remove_student", auth,
    //     celebrate({
    //         body: {
                
    //         },
    //     }),
    //     (req, res, next) => {
    //         classCtrV1.get_class_student(req, res, next);
    //     }
    // );

    router.post(
        "/accept_request", auth,
        celebrate({
            body: {
                req_id:validation.accept.req_id,
                approved:validation.accept.approved
            },
        }),
        (req, res, next) => {
            classCtrV1.accept_request(req, res, next);
        }
    );
    return router;
}
