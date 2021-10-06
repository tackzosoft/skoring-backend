import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Join_requestModule extends Model {

}

Join_requestModule.init(
    {
        request_created_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        req_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        unique_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        class_id:{
            type: DataTypes.STRING,
            allowNull: true,
        }


    },
    {
        modelName: "join_request_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);