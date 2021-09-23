"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBoardCtr = void 0;
const base_ctr_1 = __importDefault(require("../controllers/v1/base.ctr"));
const entity_1 = require("../entity");
const common_1 = require("../common");
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
                        userIdData.data.password === payload.password) {
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
    async verifyLoginOTP(req, res, next) {
        try {
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
                return this.sendResponse(res, common_1.success.default);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async resetPassword(req, res, next) {
        try {
        }
        catch (err) {
            next(err);
        }
    }
}
exports.onBoardCtr = new OnBoardCtrClass();
//# sourceMappingURL=onboard.ctr.js.map