import mongoose, { Schema }from 'mongoose';
import {IStudent} from "./student.interface";

export const studentSchema = new Schema({
});

export default mongoose.model<IStudent>('Student', studentSchema);
