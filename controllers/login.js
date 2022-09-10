const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = require("../utils/config");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const password = req.body.password === "pswd";

    if (!(user && password)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
