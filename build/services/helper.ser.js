"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.generateRandom = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("config"));
const non_secure_1 = require("nanoid/non-secure");
const generateRandom = function (type) {
    switch (type) {
        case 'user_id': return `coreyoo_${non_secure_1.customAlphabet('1234567890abcdef', 12)()}`;
        case 'salt': return non_secure_1.customAlphabet('1234567890abcdef', 12)();
        case 'otp': {
            if (config_1.default.get("check.isOTPBypassEnabled"))
                return "1010";
            return Math.floor(Math.random() * 8888 + 1111).toString();
        }
        case 'user_activation': return non_secure_1.nanoid();
        case 'resetpassword_key': return non_secure_1.nanoid();
        default: return non_secure_1.nanoid();
    }
};
exports.generateRandom = generateRandom;
const generateHash = function (text, salt) {
    return crypto_1.default.createHmac('sha256', salt).update(text).digest('hex');
};
exports.generateHash = generateHash;
//# sourceMappingURL=helper.ser.js.map