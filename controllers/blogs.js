const express = require("express");
const { Blog } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})

  try {
    const blogs = await Blog.findAll();

    console.log(JSON.stringify(blogs, null, 2));

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // const blog = await sequelize.query("insert into blogs (author, url, title) values ('Hari', 'docs.com', 'Planets')", {type: QueryTypes.INSERT})

    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    next(error);
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await Blog.destroy({
      where: {
        author: blog.author,
      },
    });

    res.status(200).json({ msg: "successfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    blog.likes = req.body.likes;

    await blog.save();

    res.json({ likes: blog.likes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
