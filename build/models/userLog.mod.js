"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogModel = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
class UserLogModel extends sequelize_1.Model {
}
exports.UserLogModel = UserLogModel;
UserLogModel.init({
    is_guest: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: [1, 50]
        }
    },
    page_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_ip: {
        type: sequelize_1.DataTypes.STRING,
    },
    page_url: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    modelName: 'users_log',
    sequelize: services_1.db.mysql,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'modified_date'
});
//# sourceMappingURL=userLog.mod.js.map