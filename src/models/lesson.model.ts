import mongoose, { Schema } from "mongoose";
import {ILesson} from "./lesson.interface";
import {homeWorkSchema} from "./home-work.model";

export const lessonSchema = new Schema({
    theme: String,
    date: String,
    duration: Number,
    url: String,
    description: String,
    homeWorks: [homeWorkSchema],
    isPublish:  Boolean,
});

export default mongoose.model<ILesson>("Lesson", lessonSchema);
