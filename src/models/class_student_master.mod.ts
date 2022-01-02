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
        class_id:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        req_id:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
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