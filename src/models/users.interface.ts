import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatus;
  activated: boolean;
}
export enum UserStatus {
  ADMIN,
  TEACHER,
  TUTOR,
  STUDENT,
}
