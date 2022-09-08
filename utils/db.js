const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

// sequelize is Object relational mapping (ORM) library
//  that allows you to store JavaScript objects in a relational database
// without using the SQL language itself,
// similar to Mongoose that we used with MongoDB.
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// we are just establishing db connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (error) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
