module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(statusCode).json({
    message: errorMessage,
    error: err,
  });
};
