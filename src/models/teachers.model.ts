import mongoose, { Schema }from 'mongoose';
import {ITeacher} from "./teachers.interface";

export const teacherSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    vkUrl: String,
});

export default mongoose.model<ITeacher>('Teacher', teacherSchema);
