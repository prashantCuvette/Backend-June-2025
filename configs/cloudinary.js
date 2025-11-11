import {v2 as cloudinary} from "cloudinary";
import { envVariables } from "./envVariables.js";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: envVariables.cloudinary.cloudName,
    api_key: envVariables.cloudinary.apiKey,
    api_secret: envVariables.cloudinary.apiSecret,
});

export { cloudinary };