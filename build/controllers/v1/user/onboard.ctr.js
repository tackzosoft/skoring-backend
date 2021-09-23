"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBoardCtrV1 = void 0;
const base_ctr_1 = __importDefault(require("../base.ctr"));
const entity_1 = require("../../../entity");
const services_1 = require("../../../services");
const common_1 = require("../../../common");
class OnBoardCtrClass extends base_ctr_1.default {
    constructor() {
        super();
    }
    async register(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.checkUserByEmailOrPhone(payload);
            if (checkIfUserExists.success) {
                this.sendResponse(res, common_1.error.user.user_already_exists);
            }
            else {
                let createUser = await entity_1.UserV1.createUser(payload);
                if (createUser.success) {
                    this.sendResponse(res, common_1.success.default, createUser.data);
                }
                else
                    throw Error('Error creating User');
            }
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            let payload = req.body;
            payload.mobile_no = payload.email;
            let checkIfUserExists = await entity_1.UserV1.checkUserByEmailOrPhone(payload);
            if (!checkIfUserExists.success) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                let userIdData = await entity_1.UserV1.getUserIdDataById(checkIfUserExists.data.user_id);
                if (!userIdData.success) {
                    this.sendResponse(res, common_1.error.user.user_not_found);
                }
                else {
                    if ((checkIfUserExists.data.email || checkIfUserExists.data.mobile_no === payload.email) &&
                        userIdData.data.password === services_1.helper.generateHash(payload.password, userIdData.data.password_salt)) {
                        await entity_1.UserV1.updateUserIdData(checkIfUserExists.data.user_id, { otp_key: services_1.helper.generateRandom('otp') });
                        return this.sendResponse(res, common_1.success.default, checkIfUserExists.data);
                    }
                    else
                        this.sendResponse(res, common_1.error.user.invalid_credentails);
                }
            }
        }
        catch (err) {
            next(err);
        }
    }
    async verifyActivationKey(req, res, next) {
        try {
            let payload = req.query;
            let checkIfUserExists = await entity_1.UserV1.getUserIdData({
                activation_key: payload.activation_key,
                is_verified: 0
            });
            if (!checkIfUserExists.success) {
                return this.sendResponse(res, common_1.error.user.invalid_activation_key);
            }
            else {
                await entity_1.UserV1.updateUserIdData(checkIfUserExists.data.user_id, { is_verified: 1 });
                return this.sendResponse(res, common_1.success.default);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async verifyLoginOTP(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.getUserIdDataById(payload.user_id);
            if (!checkIfUserExists.success) {
                return this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                if (checkIfUserExists.data.otp_key === payload.otp_key) {
                    await entity_1.UserV1.updateUserIdData(checkIfUserExists.data.user_id, { otp_key: "" });
                    return this.sendResponse(res, common_1.success.default);
                }
                else
                    this.sendResponse(res, common_1.error.user.invalid_otp);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async changePassword(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.checkUserByEmailOrPhone(payload);
            if (!checkIfUserExists.success) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                return this.sendResponse(res, common_1.success.default);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.checkUserByEmailOrPhone(payload);
            if (!checkIfUserExists.success) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                let resetPasswordKey = services_1.helper.generateRandom('resetpassword_key');
                await entity_1.UserV1.updateUserIdData(checkIfUserExists.data.user_id, { resetpassword_key: resetPasswordKey });
                return this.sendResponse(res, common_1.success.default);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async resetPassword(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.getUserIdData({
                resetpassword_key: payload.resetpassword_key
            });
            if (!checkIfUserExists.success) {
                return this.sendResponse(res, common_1.error.user.invalid_resetpassword_key);
            }
            else {
                await entity_1.UserV1.updateUserIdData(checkIfUserExists.data.user_id, {
                    is_verified: 1,
                    password: services_1.helper.generateHash(payload.password, checkIfUserExists.data.password_salt)
                });
                return this.sendResponse(res, common_1.success.default);
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.onBoardCtrV1 = new OnBoardCtrClass();
//# sourceMappingURL=onboard.ctr.js.map