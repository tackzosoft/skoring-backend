import { Router } from "express";
import { celebrate } from "celebrate";
// import auth from "../../../middleware/auth";
import { validation } from "../../../common";
import { onBoardCtrV1 } from "../../../controllers/v1/user/onboard.ctr";

export default function (router: Router) {
    router.post(
        "/login",
        celebrate({
            body: {
                email: validation.user.email.required(),
                password: validation.user.password.required(),
            },
        }),
        (req, res, next) => {
            onBoardCtrV1.login(req, res, next);
        }
    );
    return router;
}
