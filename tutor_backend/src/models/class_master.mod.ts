import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Create_classModule extends Model {
    unique_code: any;

}

Create_classModule.init(
    {
        created_by: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        unique_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        class_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        }

    },
    {
        modelName: "class_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);