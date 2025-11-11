import { cloudinary } from "../configs/cloudinary.js";

export const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        stream.end(fileBuffer);
    });
}