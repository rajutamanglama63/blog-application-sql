const errorHandler = (err, req, res, next) => {
  console.log(err.messsage);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ err: err.messsage });
  }

  next(err);
};

module.exports = {
  errorHandler,
};
