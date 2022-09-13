const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("readings", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      readingList: {
        type: DataTypes.ARRAY(DataTypes.ARRAY),
        defaultValue: [],
      },
    });
    await queryInterface.createTable("memberships", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      reading_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "readings", key: "id" },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readings");
    await queryInterface.dropTable("memberships");
  },
};
