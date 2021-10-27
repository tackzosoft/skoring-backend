import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Topic_masterModule extends Model {

}

Topic_masterModule.init(
    {
        created_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        chp_id: {
            type: DataTypes.STRING,
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
        topic_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topic_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        modelName: "topic_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);