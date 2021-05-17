import { Request, Response, NextFunction } from "express";
import { toXML } from 'jstoxml';

module.exports = function (req: Request, res: Response, next: NextFunction, status:number, result:any, message: string) {
    if(req.headers['xml']) res.set('Content-Type', 'application/xml');
    
    if(message) {
        res.status(status).send(toXML({
            message,
            result
        }));
    }
    else {
        res.status(status).send(toXML({
            message
        }));
    }
};