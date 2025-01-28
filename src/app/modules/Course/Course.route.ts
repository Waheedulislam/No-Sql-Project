import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

// create
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
// get all
router.get('/', CourseControllers.getALLCourses);

// single get
router.get('/:id', CourseControllers.getSingleCourses);
// delete course
router.get('/:id', CourseControllers.deletedCourses);

// create
// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// );

export const courseRoutes = router;
