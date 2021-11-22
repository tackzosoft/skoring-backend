import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_answer_masterModule extends Model {

}
Assigment_answer_masterModule.init(
    {
        assigment_answer_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_question_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        answer_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        modelName: "assigment_answer_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
