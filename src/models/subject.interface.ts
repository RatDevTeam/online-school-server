import { Document } from 'mongoose';

export interface ISubject extends Document {
    _id: string;
    title: string;
    color: string;
    type: string;
}
