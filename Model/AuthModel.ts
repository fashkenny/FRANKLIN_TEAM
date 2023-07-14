import mongoose from "mongoose";

export interface iAuth {
    userName?: string;
    email?: string;
    password?: string;
    avatar?: string;
}

interface iAuthData extends iAuth, mongoose.Document { }

const AuthModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("auth", AuthModel);