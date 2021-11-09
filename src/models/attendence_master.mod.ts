import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Attendence_masterModule extends Model {

}

Attendence_masterModule.init(
    {
        teacher_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        attendence_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attendence: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attendence_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        modelName: "attendance_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);