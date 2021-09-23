"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddress = void 0;
const base_ctr_1 = __importDefault(require("../base.ctr"));
const entity_1 = require("../../../entity");
const common_1 = require("../../../common");
class User_addressctrl extends base_ctr_1.default {
    constructor() {
        super();
    }
    async save_address(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.getUserData(payload.user_id);
            if (!checkIfUserExists.success) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                let insert_address = await entity_1.UserV1.saveAddress(payload, checkIfUserExists);
                if (insert_address.success) {
                    this.sendResponse(res, common_1.success.default, insert_address.data);
                }
                else {
                    this.sendResponse(res, common_1.error.user.address_not_save);
                }
            }
        }
        catch (err) {
            next(err);
        }
    }
    async get_address(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.getUserData(payload.user_id);
            console.log(checkIfUserExists.data.user_id);
            if (!checkIfUserExists) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                let show_address = await entity_1.UserV1.showAddress(checkIfUserExists.data.user_id);
                if (show_address) {
                    this.sendResponse(res, common_1.success.default, show_address.data);
                }
                else {
                    this.sendResponse(res, common_1.error.user.address_not_save);
                }
            }
        }
        catch (err) {
            next(err);
        }
    }
    async update_adress(req, res, next) {
        try {
            let payload = req.body;
            let checkIfUserExists = await entity_1.UserV1.getUserData(payload.user_id);
            console.log(checkIfUserExists.data.user_id);
            if (!checkIfUserExists) {
                this.sendResponse(res, common_1.error.user.user_not_found);
            }
            else {
                let update_address = await entity_1.UserV1.updateAddress(payload, checkIfUserExists.data);
                if (update_address) {
                    this.sendResponse(res, common_1.success.default, update_address.data);
                }
                else {
                    this.sendResponse(res, common_1.error.user.addres_not_update);
                }
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userAddress = new User_addressctrl();
//# sourceMappingURL=user_address.ctr.js.map