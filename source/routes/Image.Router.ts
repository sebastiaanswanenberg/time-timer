import express, { Request, Response, NextFunction } from "express";
import IImage from '../models/Image.Interface';
import ImageController from '../controllers/Image.Controller';
import UserRouter from '../routes/User.Router';
import ImageModel from "../models/Image.Model";


const Router = express.Router();
const _imageController = new ImageController();

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
Router.post('/postinitial', (req: Request, res: Response, next: NextFunction) => {
    let { username, image, lat, long } = req.body;
    _imageController
        .createInitialImage(username, image, lat, long)
        .then(data => {
            if(data) _imageController.jsonorxml(req, res, next, 200, data, 'image uploaded');
            else _imageController.jsonorxml(req, res, next, 404, data, 'Something went wrong');
        })
});

Router.use('/:imageid', (req: Request, res: Response, next: NextFunction) => {
    let { imageid } = req.params;

    _imageController
        .findone({ 'path': imageid})
        .then(data => {
            if(data) _imageController.jsonorxml(req, res, next, 200, data, 'image uploaded');
            else _imageController.jsonorxml(req, res, next, 404, data, 'Something went wrong');
        });
})

Router.use('/:imageid/users/', UserRouter);

export default Router;