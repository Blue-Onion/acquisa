import jwt from "jsonwebtoken";

import logger from "#config/logger.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = "1d";

export const jwtToken=(payload)=>{
    sign:(payload)=>{
        try {
            return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        } catch (error) {
            logger.error("Error signing JWT:", error);
            throw new Error("Could not sign JWT");
        }
    }
    verify:(token)=>{
        try {
            return jwt.verify(token,JWT_SECRET);
        } catch (error) {
            logger.error("Error signing JWT:", error);
            throw new Error("Could not sign JWT");
        }
    }

}
