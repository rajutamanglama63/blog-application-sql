const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const errorHandler = (err, req, res, next) => {
  console.log(err.messsage);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ err: err.message });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
