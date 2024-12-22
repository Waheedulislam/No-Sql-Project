import { Student } from './student.model';

// get all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find();

  return result;
};
// get single student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id });

  return result;
};

// delete student
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
};
