import mongoose, { Schema }from 'mongoose';
import { ISubject } from './subject.interface';

const subjectSchema = new Schema({
    title: String,
    color: String,
    type: String,
});

export default mongoose.model<ISubject>('Subject', subjectSchema);
