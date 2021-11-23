import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Chapter_masterModule extends Model {

}

Chapter_masterModule.init(
    {
        created_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        chp_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        chapter_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        modelName: "chapter_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);