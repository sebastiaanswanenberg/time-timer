import { Request, Response, NextFunction } from "express";
import IUser from "../models/User.Interface";
import { Role } from '../models/Role.Enum';

module.exports = function (req: Request, res: Response, next: NextFunction) {
    let { user } = req.body;

    if (isUser(user)) {
        if(user.Role == Role.ADMIN) next();
    }
    else {
        res.status(403).json('You dont have the rights');
    }
};

function isUser(obj: any): obj is IUser {
    return typeof obj.Username === "string" && typeof obj.Password === "string";
};
