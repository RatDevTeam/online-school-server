import mongoose, { Schema } from "mongoose";
import {IUser, UserRole} from "./user.interface";

export const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  status: String,
  createDate: Date,

});

export default mongoose.model<IUser>("User", userSchema);
