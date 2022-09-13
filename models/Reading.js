const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Reading extends Model {}
Reading.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    readingList: {
      type: DataTypes.ARRAY(DataTypes.ARRAY),
      defaultValue: [],
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "reading",
  }
);

module.exports = Reading;
