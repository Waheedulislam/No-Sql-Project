import express from 'express';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

// create
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
// get all
router.get('/', AcademicFacultyControllers.getALLAcademicFaculties);

// single get
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

// create
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
