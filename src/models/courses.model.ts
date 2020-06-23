import mongoose, { Schema }from 'mongoose';
import { ICourse } from './courses.interface';

const courseSchema = new Schema({
    title: String,
    description: String,
    dateStart: Date,
    dateFinish: Date,
    imageUrl: String,
    subject: String,
    type: String,
    price: String,
    homeWorks: [{
        date: Date,
        title: String,
        description: String,

    }],
    scripts: [{
        title: String,
        link: String,
    }],
});

export default mongoose.model<ICourse>('Course', courseSchema);
