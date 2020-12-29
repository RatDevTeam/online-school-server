import { Document } from "mongoose";
import { ISubject } from "./subject.interface";
import {ILesson} from "./lesson.interface";

export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  dateStart: string;
  dateFinish: string;
  imageUrl: string;
  subject: ISubject;
  type: CourseTypes;
  price: string;
  teachers: string[];
  lessons: ILesson[],
  scripts: IScript[];
  isPublish: boolean;
}

export enum CourseTypes {
  MASTER = 'master',
  SPECIAL = 'special',
}

export interface IScript {
  title: string;
  url: string;
}