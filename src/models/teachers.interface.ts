import { Document } from 'mongoose';

export interface ITeacher extends Document {
    name: string;
    description: string;
    imgUrl: string;
    vkUrl: string;
}
