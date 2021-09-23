"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
function default_1(router) {
    router.use(printRoutes);
    router.use(modifyHeaders);
    router.use('/v1', v1_1.default(express_1.Router()));
    return router;
}
exports.default = default_1;
function printRoutes(req, res, next) {
    console.log(`\n========================= NEW REQUEST -> ${req.method} ${req.originalUrl}`);
    console.log(req.body);
    console.log(`\n=========================`);
    next();
}
function modifyHeaders(req, res, next) {
    next();
}
//# sourceMappingURL=index.js.map