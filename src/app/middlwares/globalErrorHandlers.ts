import { NextFunction, Request, Response } from 'express';

const globalErrorHandlers = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = 5000; // Ensure valid HTTP status code
  const message = err.message || 'Something went wrong!';
  res.status(statusCode).json({
    success: false,
    message,
    error: err.stack, // Optional: Include stack trace for debugging
  });
};

export default globalErrorHandlers;
