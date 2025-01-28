import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import mongoose from 'mongoose';

const globalErrorHandlers: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // setting default values
  let statusCode = 500; // Ensure valid HTTP status code
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err.name === 'ValidationError' && 'errors' in err) {
    // Type assertion: Ensure `err` is treated as `mongoose.Error.ValidationError`
    const simplifiedError = handleValidationError(
      err as mongoose.Error.ValidationError,
    );
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandlers;
