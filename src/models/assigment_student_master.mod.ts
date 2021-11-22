import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_student_masterModule extends Model {

}
Assigment_student_masterModule.init(
    {
        assigment_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigment_student_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_submit: {
            type: DataTypes.DATE,
            allowNull: true,

        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        modelName: "assigment_student_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
