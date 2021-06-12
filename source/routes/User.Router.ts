import express, { Request, Response, NextFunction } from "express";
import UserController from '../controllers/User.Controller';
import IUser from '../models/User.Interface';
import UserModel from '../models/User.Model';

const Router = express.Router();
const _userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Gets all users.
 *     produces:
 *      - application/json
 *      - application/xml
 *     responses:
 *       200:
 *         description: Returns all users in xml/json.
 *       401:
 *         description: unauthorized user.
 *       500:
 *         description: Something went wrong.
 */
Router.get('/', (req: Request, res: Response, next: NextFunction) => {
    _userController
        .getUsers()
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, '');
            else _userController.jsonorxml(req, res, next, 500, data, 'Something went wrong');
        });
});


/**
 * @swagger
 * /users/{id}
 *   get:
 *     description: Gets a user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: path
 *        name: username
 *     responses:
 *       200:
 *         description: Returns the user in xml/json.
 *       401:
 *         description: unauthorized user.
 *       500:
 *         description: Something went wrong.
 */
Router.get('/:username', (req: Request, res: Response, next: NextFunction) => {
    let { username } = req.body;

    _userController
        .getUser(username)
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, '');
            else _userController.jsonorxml(req, res, next, 500, data, 'Something went wrong');
        });
});


/**
 * @swagger
 * /users/{id}
 *   get:
 *     description: Edits a user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: path
 *        name: username
 *      - in: body
 *        name: password
 *      - in: header
 *        name: JWT Token
 *     responses:
 *       200:
 *         description: Returns the updated user in xml/json.
 *       404:
 *         description: The user was not found.
 */
Router.put('/:username', (req: Request, res: Response, next: NextFunction) => {
    let { username, password, admin, image } = req.body;

    const updatedUser: IUser = new UserModel({
        username,
        password,
        admin,
        image
    });

    _userController
        .updateUser(username, updatedUser)
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, 'Updated user with username: ' + username);
            else _userController.jsonorxml(req, res, next, 404, data, 'User not found');
        });
});



/**
 * @swagger
 * /users/{id}
 *   get:
 *     description: Deletes a user.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *      - in: path
 *        name: username
 *      - in: body
 *        name: password
 *      - in: header
 *        name: JWT Token
 *     responses:
 *       200:
 *         description: Returns the updated user in xml/json.
 *       401:
 *         description: unauthorized user.
 *       404:
 *         description: The user was not found.
 */
Router.delete('/:username', function (req, res, next) {
    let { username } = req.body;

    _userController
        .deleteUser(username)
        .then(data => {
            if(data) _userController.jsonorxml(req, res, next, 200, data, 'Deleted user with username: ' + username);
            else _userController.jsonorxml(req, res, next, 404, data, 'User not found');
        });
});

export default Router;