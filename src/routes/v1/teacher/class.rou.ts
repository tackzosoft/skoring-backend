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

    router.post(
        "/join_class", auth,
        celebrate({
            body: {
                unique_code:validation.join.unique_code
            },
        }),
        (req, res, next) => {
            classCtrV1.join_class(req, res, next);
        }
    );

    router.put(
        "/accept_request", auth,
        celebrate({
            body: {
                active:validation.accept.active,
                approved:validation.accept.approved
            },
        }),
        (req, res, next) => {
            classCtrV1.accept_request(req, res, next);
        }
    );
    return router;
}
