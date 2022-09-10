const express = require("express");
const { User } = require("../models");
const { Blog } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error });
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (user) {
      (user.username = req.body.username), (user.name = req.body.name);

      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
