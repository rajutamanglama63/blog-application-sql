const express = require("express");
const dotenv = require("dotenv");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})

  const blogs = await Blog.findAll();

  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    // const blog = await sequelize.query("insert into blogs (author, url, title) values ('Hari', 'docs.com', 'Planets')", {type: QueryTypes.INSERT})
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  await Blog.destroy({
    where: {
      author: blog.author,
    },
  });

  res.status(200).json({ msg: "successfully deleted" });
});

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

start();
