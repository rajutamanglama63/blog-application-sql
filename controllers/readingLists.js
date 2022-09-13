const express = require("express");
const { Blog, User, Reading } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const router = express.Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Reading.create({
      userId: user.id,
      blogId: req.body.blogId,
    });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
