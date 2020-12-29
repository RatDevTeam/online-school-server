import {IUser, UserRole, UserStatus} from "./user.interface";

export interface IStudent extends IUser {
    role: UserRole.STUDENT
}
