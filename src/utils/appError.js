class AppError extends Error {
  constructor(message, statsCode) {
    super(message);

    this.statsCode = statsCode;
    this.status = statsCode === 400 ? 'fail' : 'error';
    this.isOperrational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
