import { NextFunction, Request, Response } from 'express';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'AIP NOT FOUND ',
    error: '',
  });
};
