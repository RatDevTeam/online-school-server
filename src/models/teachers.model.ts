import mongoose, { Schema }from 'mongoose';
import { ITeacher } from "./teachers.interface";
import { subjectSchema } from "./subject.model";

export const teacherSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    vkUrl: String,
    subject: subjectSchema
});

export default mongoose.model<ITeacher>('Teacher', teacherSchema);
