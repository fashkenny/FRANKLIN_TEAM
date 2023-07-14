import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoString: string = process.env.APP_URL!;

export const dbConfig = async () => {
    await mongoose.connect(mongoString).then(() => {
        console.log("Connected");
    })
}