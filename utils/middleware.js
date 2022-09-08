const errorHandler = (err, req, res, next) => {
  console.log(err.messsage);

  next(err);
};

module.exports = {
  errorHandler,
};
