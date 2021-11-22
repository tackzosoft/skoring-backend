import { Router } from "express";
import { celebrate } from "celebrate";
import auth from "../../../middleware/auth";
import { validation } from "../../../common";
import { AdminCtrV1 } from "../../../controllers/v1/admin/admin.ctr";

export default function (router: Router) {
    router.post(
        "/admin_login",
        celebrate({
            body: {
                email: validation.user.email.required(),
                password: validation.user.password.required(),
            },
        }),
        (req, res, next) => {
            AdminCtrV1.login(req, res, next);
        }
    );

    router.get(
        "/active_students", auth,

        (req, res, next) => {
            AdminCtrV1.get_active_students(req, res, next);
        }
    );

    router.get(
        "/active_teachers", auth,

        (req, res, next) => {
            AdminCtrV1.get_active_teachers(req, res, next);
        }
    );

    router.get(
        "/inactive_students", auth,

        (req, res, next) => {
            AdminCtrV1.get_inactive_students(req, res, next);
        }
    );

    router.get(
        "/inactive_teachers", auth,

        (req, res, next) => {
            AdminCtrV1.get_inactive_teachers(req, res, next);
        }
    );

    router.post(
        "/approve_user", auth,
        celebrate({
            body: {
                user_id: validation.user_master.user_id,
                user_type: validation.user_master.user_type,
                approved: validation.user_master.approved
            }
        }),
        (req, res, next) => {
            AdminCtrV1.approve_user(req, res, next);
        }
    );

    router.post(
        "/approval_request", auth,
        celebrate({
            body: {
                user_type: validation.user_master.user_type
            }
        }),
        (req, res, next) => {
            AdminCtrV1.get_approval_request(req, res, next);
        }
    );

    return router;
}
