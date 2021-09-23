import { Model, DataTypes } from "sequelize";
import { db } from "../services";

export default class Address_masterModule extends Model {

}
Address_masterModule.init(
    {
        address_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        pin_code:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    },
    {
        modelName: "address_master",
        timestamps: true,
        sequelize: db.mysql,
        createdAt:"date_created",
        updatedAt:"date_modified"
    }
);
