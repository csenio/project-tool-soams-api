// Shortcut to send a response in JSON format including a status code
module.exports.sendJSONresponse = (res, status, content = {}) => {
  res.status(status);
  res.json(content);
};

// Create new error class for errors returned from the API
module.exports.AppError = class AppError extends Error {
  constructor(status, message) {
    // Calling parent constructor of base Error class
    super(message);

    // Capturing stack trace, excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);

    // Set error data
    this.status = status;
    this.message = message;
  }
};
