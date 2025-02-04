import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .trim()
    .nonempty('First name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('Last name is required'),
});
const updatedUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .trim()
    .nonempty('First name is required')
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('Last name is required').optional(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father name is required'),
  fatherOccupation: z.string().trim().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father name is required').optional(),
  fatherOccupation: z
    .string()
    .trim()
    .nonempty('Father occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .nonempty('Father contact number is required')
    .optional(),
  motherName: z.string().nonempty('Mother name is required').optional(),
  motherOccupation: z
    .string()
    .nonempty('Mother occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .nonempty('Mother contact number is required')
    .optional(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required').optional(),
  occupation: z
    .string()
    .nonempty('Local guardian occupation is required')
    .optional(),
  contactNo: z
    .string()
    .nonempty('Local guardian contact number is required')
    .optional(),
  address: z.string().nonempty('Local guardian address is required').optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: 'Gender must be male, female, or other',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .nonempty('Email is required'),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        invalid_type_error: 'Blood group must be a valid type (e.g., A+, O-)',
      }),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().nonempty('Profile image is required'),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updatedUserNameValidationSchema.partial(),
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender must be male, female, or other',
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error: 'Blood group must be a valid type (e.g., A+, O-)',
        })
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.partial(),
      localGuardian: updateLocalGuardianValidationSchema.partial(),
      admissionSemester: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
