const express = require("express");
const { Op } = require("sequelize");
const { Blog, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})

  try {
    const where = {};

    if (req.query.search) {
      where.title = {
        [Op.substring]: req.query.search,
      };
    }
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
    });

    console.log(JSON.stringify(blogs, null, 2));

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    // const blog = await sequelize.query("insert into blogs (author, url, title) values ('Hari', 'docs.com', 'Planets')", {type: QueryTypes.INSERT})

    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.findByPk(req.params.id);

    if (user.id === blog.userId) {
      await Blog.destroy({
        where: {
          author: blog.author,
        },
      });
    }

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
