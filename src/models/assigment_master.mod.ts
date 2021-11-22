import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_masterModule extends Model {

}
Assigment_masterModule.init(
    {
        assigment_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_file: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        approved: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        assigment_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dead_line: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        modelName: "assigment_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
