import jwt from "jsonwebtoken";
import { envVariables } from "../configs/envVariables.js";

export function generateToken(userId) {
    return jwt.sign({ id: userId }, envVariables.accessToken, {
        expiresIn: "1d"
    });
}