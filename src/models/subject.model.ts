import mongoose, { Schema }from 'mongoose';
import { ISubject } from './subject.interface';

export const subjectSchema = new Schema({
    title: String,
    type: String,
    color: String,
});

export default mongoose.model<ISubject>('Subject', subjectSchema);
