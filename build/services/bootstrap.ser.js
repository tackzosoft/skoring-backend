"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
async function default_1() {
    try {
        await connectMySQLServer();
    }
    catch (error) {
        console.log("Error: ", error);
    }
}
exports.default = default_1;
async function connectMySQLServer() {
    await services_1.db.mysql.authenticate();
    console.log("Success: Database connected");
}
//# sourceMappingURL=bootstrap.ser.js.map