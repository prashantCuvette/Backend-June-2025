import dotenv from "dotenv";
dotenv.config();

export const envVariables = {
    port: process.env.PORT_NUMBER,
    mongodbUri: process.env.MONGODB_URI,
    accessToken: process.env.ACCESS_TOKEN,
    clientUrl: process.env.CLIENT_URL,
};

Object.freeze(envVariables); // prevent modification of the object

