import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'


export const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.slice(7, authHeader.length);
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = User.findOne({ _id: decoded._id });
            next();
        }
        catch {
            throw Error("Unauthorized, invalid token");
        }
    } else {
        throw Error("NO TOKEN FOUND!!!")
    }
});