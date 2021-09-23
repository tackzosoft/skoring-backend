"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
class UserIdModel extends sequelize_1.Model {
}
exports.default = UserIdModel;
UserIdModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password_salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    signup_ip: {
        type: sequelize_1.DataTypes.STRING,
    },
    activation_key: {
        type: sequelize_1.DataTypes.STRING,
    },
    resetpassword_key: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_role: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    modelName: 'users_id',
    sequelize: services_1.db.mysql,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'modified_date',
});
//# sourceMappingURL=userId.mod.js.map