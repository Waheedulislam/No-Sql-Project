import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

// create all semester
const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  // semester name ===> semester code

  //academicSemesterNameCodeMapper
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Invalid Semester code');
  }

  const result = await AcademicSemesterModel.create(payLoad);

  return result;
};

// get all semester
const getALLAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemesterModel.find();

  return result;
};

// get single semester
const getSingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  // const result = await AcademicSemesterModel.findOne({ _id }); // another way to get semester

  return result;
};

// update academic semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getALLAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
