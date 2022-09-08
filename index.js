const express = require("express");
const dotenv = require("dotenv");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const blogRouter = require("./controllers/blogs");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

start();
