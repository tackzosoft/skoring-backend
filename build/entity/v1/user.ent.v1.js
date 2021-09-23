"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const common_1 = require("../../common");
const base_ent_1 = __importDefault(require("../base.ent"));
const services_1 = require("../../services");
const userData_mod_1 = __importDefault(require("../../models/userData.mod"));
const userId_mod_1 = __importDefault(require("../../models/userId.mod"));
const userAddress_mod_1 = require("../../models/userAddress.mod");
class UserEntity extends base_ent_1.default {
    async checkUserByEmailOrPhone(payload) {
        let whereCondition = {};
        if (payload.email && payload.mobile_no) {
            whereCondition = {
                [sequelize_1.Op.or]: [{ email: payload.email }, { mobile_no: payload.mobile_no }]
            };
        }
        else {
            if (payload.email)
                whereCondition = { email: payload.email };
            if (payload.mobile_no)
                whereCondition = { mobile_no: payload.mobile_no };
        }
        let userData = await userData_mod_1.default.findOne({ subQuery: false, where: whereCondition });
        if (userData)
            return { success: true, data: userData.toJSON() };
        else
            return { success: false };
    }
    async getUserIdDataById(user_id) {
        let userIdData = await userId_mod_1.default.findOne({ where: { user_id } });
        if (userIdData)
            return { success: true, data: userIdData.toJSON() };
        else
            return { success: false };
    }
    async getUserData(user_id) {
        let userIdData = await userData_mod_1.default.findOne({ where: { user_id } });
        if (userIdData)
            return { success: true, data: userIdData.toJSON() };
        else
            return { success: false };
    }
    async getUserIdData(condition) {
        let userIdData = await userId_mod_1.default.findOne({ where: condition });
        if (userIdData)
            return { success: true, data: userIdData.toJSON() };
        else
            return { success: false };
    }
    async createUser(payload) {
        let userId = services_1.helper.generateRandom('user_id'), password_salt = services_1.helper.generateRandom('salt');
        let createUserId = await userId_mod_1.default.create({
            user_id: userId,
            password: services_1.helper.generateHash(payload.password, password_salt),
            user_role: '1',
            status: common_1.ENUM.USER.STATUS.INACTIVE,
            password_salt: password_salt,
            username: payload.username,
            activation_key: services_1.helper.generateRandom('user_activation')
        });
        if (createUserId) {
            let createUserData = await userData_mod_1.default.create({
                user_id: userId,
                email: payload.email,
                mobile_no: payload.mobile_no,
                company_name: payload.company_name
            });
            if (createUserData) {
                return { success: true, data: createUserData.toJSON() };
            }
            else
                return { success: false };
        }
        else
            return { success: false };
    }
    async updateUserIdData(user_id, payload) {
        let userIdData = await userId_mod_1.default.update(payload, { where: { user_id } });
        console.log(userIdData);
    }
    async saveAddress(payload, user_data) {
        console.log(user_data);
        let save_address = await userAddress_mod_1.UserAddressModel.create({
            user_id: payload.user_id,
            name: user_data.data.first_name,
            email: user_data.data.email,
            phone_no: user_data.data.mobile_no,
            address1: payload.address1,
            address2: payload.address2,
            address3: payload.address3,
            city: payload.city,
            state: payload.state,
            postal_code: payload.postal_code,
            country: payload.country,
            status: payload.status,
            default_address: payload.default_address,
            address_type: payload.address_type,
            created_by: payload.user_id,
            modified_by: payload.user_id
        });
        if (save_address) {
            return { success: true, data: save_address };
        }
        else
            return { success: false };
    }
    async showAddress(user_id) {
        let addressData = await userAddress_mod_1.UserAddressModel.findOne({ where: { user_id } });
        if (addressData)
            return { success: true, data: addressData.toJSON() };
        else
            return { success: false };
    }
    async updateAddress(payload, user_data) {
        var user_id = user_data.user_id;
        let update_address = await userAddress_mod_1.UserAddressModel.update(payload, { where: { user_id } });
        if (update_address) {
            return { success: true, data: update_address };
        }
        else {
            return { success: false };
        }
    }
}
exports.default = new UserEntity();
//# sourceMappingURL=user.ent.v1.js.map