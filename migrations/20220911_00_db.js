const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: QueryInterface }) => {
    await QueryInterface.createTable("blogs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    });

    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};
