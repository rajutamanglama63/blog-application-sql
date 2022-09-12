const express = require("express");
const dotenv = require("dotenv");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const readingsRouter = require("./controllers/readingLists");
const middleware = require("./utils/middleware");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readingsRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

start();
