"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
class UserDataModel extends sequelize_1.Model {
}
exports.default = UserDataModel;
UserDataModel.init({
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    avatar_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    mobile_no: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'users_data',
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'modified_date',
    sequelize: services_1.db.mysql
});
//# sourceMappingURL=userData.mod.js.map