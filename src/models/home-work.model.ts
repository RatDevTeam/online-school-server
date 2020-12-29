import mongoose, { Schema } from "mongoose";
import {IHomeWork} from "./home-work.interface";

export const homeWorkSchema = new Schema({
    deadline: String,
    title: String,
    description: String,
    url: String,
});

export default mongoose.model<IHomeWork>("HomeWork", homeWorkSchema);
