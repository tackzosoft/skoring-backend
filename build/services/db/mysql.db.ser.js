"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize('coreyoo', 'admin', 'Alyssum123', {
    host: 'alyssum.crlovfhzmsrv.ap-south-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    define: {
        freezeTableName: true
    }
});
//# sourceMappingURL=mysql.db.ser.js.map