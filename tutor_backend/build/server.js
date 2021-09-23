"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: `config/.env.${process.env.NODE_ENV}` });
const routes_1 = __importDefault(require("./routes"));
const common_1 = require("./common");
const services_1 = require("./services");
const app = express_1.default();
const router = express_1.default.Router();
app.use(cors_1.default(), body_parser_1.default.json({ limit: "128kb" }), body_parser_1.default.urlencoded({ extended: false, limit: "2mb" }), helmet_1.default());
app.use('/api', routes_1.default(router));
app.use(common_1.handler.invalidRoute, common_1.handler.errorHandler);
const server = app.listen(config_1.default.get("port"));
server.on('listening', async function () {
    console.log("Success: Server Running on port", config_1.default.get("port"));
    services_1.bootstrap();
});
//# sourceMappingURL=server.js.map