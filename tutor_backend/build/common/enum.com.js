"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_ARR = exports.ENUM = void 0;
exports.ENUM = Object.freeze({
    USER: {
        ROLE: {
            CUSTOMER: 'customer',
            BUSINESS: 'business'
        },
        STATUS: {
            INACTIVE: 0,
            ACTIVE: 1,
            BLOCK: 2,
            DELETE: 3
        }
    }
});
exports.ENUM_ARR = Object.freeze({
    USER: {
        STATUS: Object.values(exports.ENUM.USER.STATUS)
    }
});
//# sourceMappingURL=enum.com.js.map