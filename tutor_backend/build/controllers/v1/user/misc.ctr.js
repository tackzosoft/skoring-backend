"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.miscCtrV1 = void 0;
const sequelize_1 = require("sequelize");
const base_ctr_1 = __importDefault(require("../base.ctr"));
const entity_1 = require("../../../entity");
const common_1 = require("../../../common");
class MiscCtrClass extends base_ctr_1.default {
    constructor() {
        super();
    }
    async checkUsernameAvailability(req, res, next) {
        try {
            let payload = req.query;
            let checkIfUsernameInUse = await entity_1.UserV1.getUserIdData({
                username: payload.username,
                status: { [sequelize_1.Op.in]: [common_1.ENUM.USER.STATUS.ACTIVE, common_1.ENUM.USER.STATUS.BLOCK] }
            });
            if (!checkIfUsernameInUse.success)
                return this.sendResponse(res, common_1.success.default, 200);
            else
                return this.sendResponse(res, common_1.success.default, 201);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.miscCtrV1 = new MiscCtrClass();
//# sourceMappingURL=misc.ctr.js.map