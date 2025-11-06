import jwt from "jsonwebtoken";
import { envVariables } from "../configs/envVariables.js";

export const authenticateUser = (req, res, next) => {
    try {
        const incomingCookie = req.cookies?.accessToken;
        if (!incomingCookie) {
            return res.status(400).json({
                success: false,
                message: "no token provided"
            });
        }

        const verifyToken = jwt.verify(incomingCookie, envVariables.accessToken);
        if (!verifyToken) {
            return res.status(400).json({
                success: false,
                message: "malformed token or token expired"
            });
        }
        req.user = verifyToken;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "issue in verifying token"
        });
    }
};