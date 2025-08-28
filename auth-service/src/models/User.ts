import mongoose, { Schema } from "mongoose";

export type User = {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

export default mongoose.model<User>("User", UserSchema)