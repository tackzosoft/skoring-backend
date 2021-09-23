import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Class_studentModule extends Model {

}

Class_studentModule.init(
    {
        student_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true,
        },


    },
    {
        modelName: "class_student",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);