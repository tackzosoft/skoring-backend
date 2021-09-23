"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = {
    user: {
        user_id: celebrate_1.Joi.string().trim(),
        email: celebrate_1.Joi.string().trim().email(),
        password: celebrate_1.Joi.string().min(6).max(32),
        mobile_no: celebrate_1.Joi.string().trim(),
        username: celebrate_1.Joi.string().trim(),
        otp_key: celebrate_1.Joi.string().trim().length(4),
        resetpassword_key: celebrate_1.Joi.string().trim(),
        company_name: celebrate_1.Joi.string().allow(null).allow('').optional()
    },
    address: {
        user_id: celebrate_1.Joi.string().trim(),
        address1: celebrate_1.Joi.string().trim(),
        address2: celebrate_1.Joi.string().trim(),
        address3: celebrate_1.Joi.string().trim(),
        city: celebrate_1.Joi.string().trim(),
        state: celebrate_1.Joi.string().trim(),
        postal_code: celebrate_1.Joi.string().trim(),
        country: celebrate_1.Joi.string().trim(),
        status: celebrate_1.Joi.string().trim(),
        default_address: celebrate_1.Joi.string().trim(),
        address_type: celebrate_1.Joi.string().trim(),
    },
    getServicesRate: {
        pickupPincode: celebrate_1.Joi.string().trim(),
        deliveryPincode: celebrate_1.Joi.string().trim(),
        length: celebrate_1.Joi.string().trim(),
        width: celebrate_1.Joi.string().trim(),
        height: celebrate_1.Joi.string().trim(),
        weight: celebrate_1.Joi.string().trim(),
    }
};
//# sourceMappingURL=validation.com.js.map