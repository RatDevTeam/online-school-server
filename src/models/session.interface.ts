import { Document } from "mongoose";

export interface ISession extends Document {
    _id: string;
    userId: string;
    refreshToken: string;
    expiresId: number;
    fingerprint: string;
}
