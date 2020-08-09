import { Document } from "mongoose";
import { ISubject } from "./subject.interface";

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
  homeWorks: IHomeWork[];
  scripts: IScript[];
}

export enum CourseTypes {
  MASTER,
  SPECIAL,
}

export interface IHomeWork {
  date: string;
  title: string;
  description: string;
}

export interface IScript {
  title: string;
  link: string;
}
