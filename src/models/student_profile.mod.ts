import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Student_profileModule extends Model {

}

Student_profileModule.init(
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_type: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password_salt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parent_mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        modelName: "student_profile",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);