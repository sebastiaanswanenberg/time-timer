import express, { Request, Response, NextFunction } from "express";
import UserController from '../controllers/User.Controller';
import IUser from '../models/User.Interface';
import UserModel from '../models/User.Model';

const Router = express.Router();
const _userController = new UserController();

/**
 * @swagger
 * /currentuser/score
 *   get:
 *     description: gets the score of the current user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: body
 *        name: username
 *      - in: header
 *        name: JWT Token
 *     responses:
 *       200:
 *         description: Returns the score of the user in xml/json.
 *       404:
 *         description: The user was not found.
 */
Router.get('/score', (req: Request, res: Response, next: NextFunction) => {
    //TODO: can prob be changed to actually be dynamic. Maby on jwt token
    let { username } = req.body;

    _userController
        .getCurrentUserScore(username)
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, 'Deleted user with username: ' + username);
            else _userController.jsonorxml(req, res, next, 404, data, 'User not found');
        });
});


/**
 * @swagger
 * /currentuser/uploads
 *   get:
 *     description: gets the uploads of the current user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: body
 *        name: username
 *      - in: header
 *        name: JWT Token
 *     responses:
 *       200:
 *         description: Returns the uploads of the user in xml/json.
 *       404:
 *         description: The user was not found.
 */
Router.get('/uploads', (req: Request, res: Response, next: NextFunction) => {
    let { username } = req.body;

    _userController
        .getCurrentUserUploads(username)
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, 'Deleted user with username: ' + username);
            else _userController.jsonorxml(req, res, next, 404, data, 'User not found');
        });
});



export default Router;