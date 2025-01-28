import { Schema, Types, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Schema
const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, trim: true, required: true },
  credits: { type: Number, trim: true, required: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

// 3. Create a Model.
export const Course = model<TCourse>('Course', courseSchema);
