import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create academic Faculty
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all academic Faculties
const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// get single academic Faculty
const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update academic Faculty
// Update Academic Faculty
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  // সরাসরি id প্রদান করুন
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true, // Updated ডেটা রিটার্ন করবে
    runValidators: true, // Schema validation নিশ্চিত করবে
  });

  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
