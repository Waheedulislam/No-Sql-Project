import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

//create students
const createStudent = catchAsync(async (req, res, next) => {
  // creating a schema validation using zod

  const { password, student: studentData } = req.body;

  // will call service function to send this data
  const result = await userService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Created successfully',
    data: result,
  });
});

export const UsersController = {
  createStudent,
};
