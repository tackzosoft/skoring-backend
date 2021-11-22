import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_question_masterModule extends Model {

}
Assigment_question_masterModule.init(
    {
        assigment_question_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_question: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigment_question_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        question_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assigment_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    },
    {
        modelName: "assigment_question_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
