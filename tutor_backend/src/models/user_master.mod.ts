import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class User_masterModule extends Model {


}

User_masterModule.init(
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password_salt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
        },
        approved: {
            type: DataTypes.INTEGER,
        },
        date_created: {
            type: DataTypes.DATE
        },
        date_modified: {
            type: DataTypes.DATE
        },
        user_type: {
            type: DataTypes.INTEGER,
        }

    },
    {
        modelName: "user_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"

    }
);