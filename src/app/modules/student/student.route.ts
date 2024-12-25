import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

// will call controller function
router.get('/', StudentControllers.getAllStudents);

router.get(
  '/:studentId',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.getSingleStudents,
);
router.delete('/:studentId', StudentControllers.deleteStudents);

router.patch('/:studentId', StudentControllers.updatedStudents);

export const StudentRoutes = router;
