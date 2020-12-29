import { Document } from 'mongoose';
import {ISubject} from "./subject.interface";

export interface ITeacher extends Document {
    _id: string;
    name: string;
    description: string;
    imgUrl: string;
    vkUrl: string;
    subject: ISubject;
}
