const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL;

const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  DATABASE_URL,
  SECRET,
};
