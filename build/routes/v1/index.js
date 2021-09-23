"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const msic_rou_1 = __importDefault(require("./user/msic.rou"));
const onboard_rou_1 = __importDefault(require("./user/onboard.rou"));
const rate_rou_1 = __importDefault(require("./servicesRate/rate.rou"));
function default_1(router) {
    router.use('/user', msic_rou_1.default(express_1.Router()));
    router.use('/user', onboard_rou_1.default(express_1.Router()));
    router.use('/services', rate_rou_1.default(express_1.Router()));
    return router;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map