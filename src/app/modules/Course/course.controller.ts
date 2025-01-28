import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getALLCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCoursesFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Faculty is get successfully',
    data: result,
  });
});

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body,
//   );
//   // send response
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is updated successfully',
//     data: result,
//   });
// });
const deletedCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCoursesFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getALLCourses,
  getSingleCourses,
  deletedCourses,
};
