"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const controllers_1 = require("../../../controllers");
const common_1 = require("../../../common");
function default_1(router) {
    router.post('/register', celebrate_1.celebrate({
        body: {
            email: common_1.validation.user.email.required(),
            password: common_1.validation.user.password.required(),
            mobile_no: common_1.validation.user.mobile_no.required(),
            company_name: common_1.validation.user.company_name,
            username: common_1.validation.user.username
        }
    }), (req, res, next) => {
        controllers_1.onBoardCtrV1.register(req, res, next);
    });
    router.post('/login', celebrate_1.celebrate({
        body: {
            email: common_1.validation.user.email.required(),
            password: common_1.validation.user.password.required(),
        }
    }), (req, res, next) => {
        controllers_1.onBoardCtrV1.login(req, res, next);
    });
    router.patch('/verify-login-otp', celebrate_1.celebrate({
        body: {
            user_id: common_1.validation.user.user_id.required(),
            otp_key: common_1.validation.user.otp_key.required()
        }
    }), (req, res, next) => {
        controllers_1.onBoardCtrV1.verifyLoginOTP(req, res, next);
    });
    router.get('/verify-activation-key', (req, res, next) => {
        controllers_1.onBoardCtrV1.verifyActivationKey(req, res, next);
    });
    router.post('/forgot-password', celebrate_1.celebrate({
        body: {
            email: common_1.validation.user.email.required()
        }
    }), (req, res, next) => {
        controllers_1.onBoardCtrV1.forgotPassword(req, res, next);
    });
    router.patch('/reset-password', celebrate_1.celebrate({
        body: {
            resetpassword_key: common_1.validation.user.resetpassword_key.required(),
            password: common_1.validation.user.password.required()
        }
    }), (req, res, next) => {
        controllers_1.onBoardCtrV1.resetPassword(req, res, next);
    });
    router.post('/save_address', celebrate_1.celebrate({
        body: {
            user_id: common_1.validation.user.user_id.required(),
            address1: common_1.validation.address.address1,
            address2: common_1.validation.address.address2,
            address3: common_1.validation.address.address3,
            city: common_1.validation.address.city,
            state: common_1.validation.address.state,
            postal_code: common_1.validation.address.postal_code,
            country: common_1.validation.address.country,
            status: common_1.validation.address.state,
            default_address: common_1.validation.address.default_address,
            address_type: common_1.validation.address.address_type
        }
    }), (req, res, next) => {
        controllers_1.userAddress.save_address(req, res, next);
    });
    router.post('/show_address', celebrate_1.celebrate({
        body: {
            user_id: common_1.validation.user.user_id.required(),
        }
    }), (req, res, next) => {
        controllers_1.userAddress.get_address(req, res, next);
    });
    router.post('/update_address', celebrate_1.celebrate({
        body: {
            user_id: common_1.validation.user.user_id.required(),
            address1: common_1.validation.address.address1,
            address2: common_1.validation.address.address2,
            address3: common_1.validation.address.address3,
            city: common_1.validation.address.city,
            state: common_1.validation.address.state,
            postal_code: common_1.validation.address.postal_code,
            country: common_1.validation.address.country,
            status: common_1.validation.address.state,
            default_address: common_1.validation.address.default_address,
            address_type: common_1.validation.address.address_type
        }
    }), (req, res, next) => {
        controllers_1.userAddress.update_adress(req, res, next);
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=onboard.rou.js.map