import mongoose, { Schema } from "mongoose";
import { IUser } from "./users.interface";

export const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status: Number,
  activated: Boolean,
});

export default mongoose.model<IUser>("User", userSchema);
