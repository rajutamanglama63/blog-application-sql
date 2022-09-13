const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const { Umzug, SequelizeStorage } = require("umzug");

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

// migration file running to make sync model schema and DB
// const runMigrations = async () => {
//   const migrator = new Umzug({
//     migrations: {
//       glob: "migrations/*.js",
//     },
//     storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
//     context: sequelize.getQueryInterface(),
//     logger: console,
//   });

//   const migrations = await migrator.up();
//   console.log("Migrations up to date", {
//     files: migrations.map((mig) => mig.name),
//   });
// };

// we are just establishing db connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
