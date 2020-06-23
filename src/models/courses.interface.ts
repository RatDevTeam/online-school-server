import { Document } from 'mongoose';


export interface ICourse extends Document {
    _id: string;
    title: string,
    description: string,
    dateStart: string,
    dateFinish: string,
    imageUrl: string,
    subject: string,
    price: string,
    type: CourseTypes,
    homeWorks: IHomeWork[],
    scripts: IScript[],
}

export enum CourseTypes {
    MASTER ,
    SPECIAL,
}

export interface IHomeWork {
    date: string,
    title: string,
    description: string,

}

export interface IScript {
    title: string,
    link: string,
}
