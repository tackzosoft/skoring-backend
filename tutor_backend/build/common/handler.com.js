"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.invalidRoute = void 0;
const celebrate_1 = require("celebrate");
const invalidRoute = (req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
};
exports.invalidRoute = invalidRoute;
const errorHandler = (err, req, res, next) => {
    var _a, _b, _c;
    if (celebrate_1.isCelebrateError(err)) {
        return res.status(400).send({
            success: false,
            statusCode: 400,
            key: (_b = (_a = err.details.get('body')) === null || _a === void 0 ? void 0 : _a.details[0].context) === null || _b === void 0 ? void 0 : _b.key,
            message: (_c = err.details.get('body')) === null || _c === void 0 ? void 0 : _c.details[0].message.replace(/"/g, '')
        });
    }
    else if (err.expose) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode
        });
    }
    else {
        console.log('ERROR -> ', err);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=handler.com.js.map