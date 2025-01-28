import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

// get all student
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //{email: {$regex: query.searchTerm, $options:i}}
  //{presentAddress: {$regex: query.searchTerm, $options:i}}
  //{name.firstName: {$regex: query.searchTerm, $options:i}}
  console.log('baseQuery', query);
  const queryObj = { ...query };

  const studentSearchableFiends = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  //Filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];

  excludeFields.forEach((el) => delete query[el]);
  // console.log({ query, queryObj });

  const searchQuery = Student.find({
    $or: studentSearchableFiends.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery
    .find(query)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if (query.limit) {
    limit = query.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

// get single student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

// updated student
const updatedStudentsFromIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudent } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudent };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// delete student
const deleteStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updatedStudentsFromIntoDB,
};
