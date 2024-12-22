import express, { NextFunction, Request, Response } from 'express';
import { UsersController } from './user.controller';
import { studentValidation } from '../student/student.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UsersController.createStudent,
);

export const UserRoutes = router;
