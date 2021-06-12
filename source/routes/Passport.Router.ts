import express ,{ Request, Response, NextFunction } from "express";
import passport from 'passport';
import Controller from '../controllers/Standard.Controller';
import IUser from "../models/User.Interface";
import UserModel from "../models/User.Model";
import JWT from 'jsonwebtoken';
import config from "../config/config";

const Router = express.Router();
const _controller = new Controller();

/**
 * @swagger
 * /auth/login
 *   get:
 *     description: Logging in a user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: body
 *        name: username
 *      - in body
 *        name: password
 *     responses:
 *       200:
 *         description: Returns JWT.
 *       401:
 *         description: Login failed.
 */
Router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    //TODO: Can this work with promises. Looks way better :)
    passport.authenticate('local-login', (err, user) => {
        if(err) return next(err);
        if(!user) return _controller.jsonorxml(req, res, next, 401, user, 'User not found');

        req.login(user, () => {
            if(err) return next(err);
            
            let { username, password } = req.body;

            const someUser: IUser = new UserModel({
                username,
                password
            });

            let token = JWT.sign(someUser, config.server.token.secret, { expiresIn: '1h' });

            return _controller.jsonorxml(req, res, next, 200, { token: token }, 'User is now logged in')
        });
    })
});

/**
 * @swagger
 * /auth/login
 *   get:
 *     description: Signup for a user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: body
 *        name: username
 *      - in body
 *        name: password
 *     responses:
 *       500:
 *         description: User already exists or some other error. (will be spec. in message)
 *       200:
 *         description: Signup Succesfull
 */
Router.put('signup', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local-signup', (err, user) => {
        if(err) _controller.jsonorxml(req, res, next, 500, err, 'Somehting went wrong');
        if(!user) return _controller.jsonorxml(req, res, next, 500, user, 'User already exists!');
        _controller.jsonorxml(req, res, next, 200, user, 'Signup Succesfull');
    })
});

export default Router;