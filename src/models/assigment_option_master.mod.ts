import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_option_masterModule extends Model {

}
Assigment_option_masterModule.init(
    {
        assigment_option_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_question_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assigment_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        option: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_correct: {
            type: DataTypes.STRING,
            allowNull: true
        },
        option_image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    },
    {
        modelName: "assigment_option_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
