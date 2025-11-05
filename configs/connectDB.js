import mongoose from "mongoose";
import { envVariables } from "./envVariables.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.mongodbUri, {
            dbName: "backend_june_2025",
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};