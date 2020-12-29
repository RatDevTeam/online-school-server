import {Document} from "mongoose";

export interface IHomeWork extends Document {
    _id: string;
    deadline: string;
    title: string;
    description: string;
    url?: string;
    completedTask?: string[];
}