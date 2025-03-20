const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Check if the error is a Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(error => error.message)
    });
  }

  // Check if the error is a MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Key Error',
      details: 'A record with that value already exists'
    });
  }

  // Check if the error is a JWT error
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Authentication Error',
      details: 'Invalid or expired token'
    });
  }

  // Check if the error has a status code
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message
  });
};

module.exports = { errorHandler };
