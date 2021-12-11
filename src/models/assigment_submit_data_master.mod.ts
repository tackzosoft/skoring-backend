import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_submit_data_masterModule extends Model {

}
Assigment_submit_data_masterModule.init(
    {
        assigment_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        submit_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigment_question_id: {
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
        assigment_option_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigment_answer: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        modelName: "assigment_submit_data_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
