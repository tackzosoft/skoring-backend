import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Add_student_requestModule extends Model {

}

Add_student_requestModule.init(
    {
        request_created_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        req_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        modelName: "add_student_request_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);