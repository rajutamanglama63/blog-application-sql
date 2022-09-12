const express = require("express");
const { Blog, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const router = express.Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
