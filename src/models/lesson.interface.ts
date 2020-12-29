import {Document} from "mongoose";
import {IHomeWork} from "./home-work.interface";

export interface ILesson extends Document {
    theme: string,
    date: string,
    duration: number,
    url: string,
    description: string,
    homeWorks: IHomeWork[];
    isPublish: boolean;
}