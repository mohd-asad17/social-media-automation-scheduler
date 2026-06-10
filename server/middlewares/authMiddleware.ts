import  type { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";

export interface AuthRequest extends Request {
    user?: any
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
           const token = req.headers.authorization.split(' ')[1];
           if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
          }
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error: any) {
          res.status(401).json({message: error?.message || "No authorized, no token"});
        }
    } else {
        res.status(401).json({message: "Not authorized,, no token"});
    }
}