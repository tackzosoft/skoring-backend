"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
exports.success = {
    default: { httpCode: 200, statusCode: 200, message: "Success" }
};
exports.error = {
    user: {
        user_already_exists: { httpCode: 404, statusCode: 1001, message: "User with same email/phone number is already registered" },
        user_not_found: { httpCode: 404, statusCode: 1001, message: "User not found with this email/phone number" },
        invalid_credentails: { httpCode: 404, statusCode: 1002, message: "The email/phone number and password combination is incorrect" },
        invalid_otp: { httpCode: 404, statusCode: 1003, message: "The OTP is incorrect or expired" },
        invalid_activation_key: { httpCode: 404, statusCode: 1004, message: "The activation key is invalid or user is already verified" },
        invalid_resetpassword_key: { httpCode: 404, statusCode: 1004, message: "The reset password link is invalid or expired" },
        address_not_save: { httpCode: 404, statusCode: 1005, message: "Data not insert" },
        addres_not_update: { httpCode: 404, statusCode: 1006, message: "Data not update" }
    },
    servicesRate: {
        invalid_request: { httpCode: 404, statusCode: 2003, message: "The request is incorrect" },
    }
};
//# sourceMappingURL=response.com.js.map