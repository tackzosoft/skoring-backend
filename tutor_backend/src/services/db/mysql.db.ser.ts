import config from "../../config";
import { Sequelize } from "sequelize";

export default new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    define: {
      freezeTableName: true
    }
  }
);