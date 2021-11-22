import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Assigment_status_masterModule extends Model {

}
Assigment_status_masterModule.init(
    {
        assigment_status_id: {
            type: DataTypes.STRING,
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
        modelName: "assigment_status_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt: "date_created",
        updatedAt: "date_modified"
    }
);
