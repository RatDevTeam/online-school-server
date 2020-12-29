import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createDate: string;
}

export enum UserRole {
  ADMIN= 'admin',
  TEACHER = 'teacher',
  TUTOR = 'tutor',
  STUDENT = 'student',
}

export enum UserStatus {
  CREATED = 'created',
  ACTIVE = 'active',
  BLOCKED = 'blocked'
}
