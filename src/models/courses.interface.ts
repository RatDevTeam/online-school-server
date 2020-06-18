import { Document } from 'mongoose';


export interface ICourse extends Document {
    _id: string;
    title: string,
    description: string,
    dateStart: string,
    dateFinish: string,
    imageUrl: string,
    subject: string,
    type: CourseTypes,
    homeWorks: IHomeWork[],
    scripts: IScript[],
}

export type CourseTypes = 'master' | 'special';

export interface IHomeWork {
    date: string,
    title: string,
    description: string,

}

export interface IScript {
    title: string,
    link: string,
}
