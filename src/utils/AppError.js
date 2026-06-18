class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export default AppError;
