import { Request, Response, NextFunction } from "express";
import IUser from "../models/User.Interface";

export default function (req: Request, res: Response, next: NextFunction) {
    let { user } = req.body;

    if (isUser(user)) {
        if(user.Admin) next();
    }
    else {
        res.status(403).json('You do not have admin rights! Forbidden');
    }
};

function isUser(obj: any): obj is IUser {
    return typeof obj.Username === "string" 
        && typeof obj.Password === "string"
        && typeof obj.Admin === "boolean";
};
