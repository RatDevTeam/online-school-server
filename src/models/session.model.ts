import mongoose, { Schema } from "mongoose";
import {ISession} from "./session.interface";

const sessionSchema = new Schema({
    userId: String,
    refreshToken: String,
    expiresId: Number,
    fingerprint: String,
});

export default mongoose.model<ISession>("Session", sessionSchema);
