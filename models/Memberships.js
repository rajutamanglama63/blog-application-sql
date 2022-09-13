const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Membership extends Model {}
Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    readingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "readings", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "membership",
  }
);

module.exports = Membership;
