"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressModel = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
class UserAddressModel extends sequelize_1.Model {
}
exports.UserAddressModel = UserAddressModel;
UserAddressModel.init({
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone_no: {
        type: sequelize_1.DataTypes.STRING,
    },
    address1: {
        type: sequelize_1.DataTypes.STRING,
    },
    address2: {
        type: sequelize_1.DataTypes.STRING,
    },
    address3: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    postal_code: {
        type: sequelize_1.DataTypes.STRING,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    default_address: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_type: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    modelName: 'users_address',
    sequelize: services_1.db.mysql,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'modified_date'
});
//# sourceMappingURL=userAddress.mod.js.map