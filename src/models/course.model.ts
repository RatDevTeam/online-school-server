import mongoose, { Schema } from "mongoose";
import {ICourse} from "./course.interface";
import { subjectSchema } from "./subject.model";
import { lessonSchema } from "./lesson.model";

const courseSchema = new Schema({
  title: String,
  description: String,
  dateStart: Date,
  dateFinish: Date,
  imageUrl: String,
  subject: subjectSchema,
  type: Number,
  price: String,
  teacher: String,
  isPublish: Boolean,
  lessons: [lessonSchema],
  scripts: [
    {
      title: String,
      url: String,
    },
  ],
});

export default mongoose.model<ICourse>("Course", courseSchema);
