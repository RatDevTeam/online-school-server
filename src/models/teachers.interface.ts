import { Document } from 'mongoose';

export interface ITeacher extends Document {
    _id: string;
    name: string;
    description: string;
    imgUrl: string;
    vkUrl: string;
}
