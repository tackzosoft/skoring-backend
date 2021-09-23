import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Accept_requestModule extends Model {

}

Accept_requestModule.init(
    {
        request_accepted_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        req_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        approved: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },


    },
    {
        modelName: "accept_request_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);