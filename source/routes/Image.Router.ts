import express, { Request, Response, NextFunction } from "express";
import IImage from '../models/Image.Interface';
import ImageController from '../controllers/Image.Controller';
import UserRouter from '../routes/User.Router';
import ImageModel from "../models/Image.Model";


const Router = express.Router();
const _imageController = new ImageController();

/**
 * @swagger
 * /postinitial:
 *   post:
 *     description: new game with foto upload.
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *       - in: body
 *         name: long
 *       - in: body
 *         name: lat
 *       - in: header
 *         name: JWT token
 *     responses:
 *       200:
 *         description: image uploaded and game created.
 *       500:
 *         description: no file uploaded.
 */
Router.post('/postinitial', (req: Request, res: Response, next: NextFunction) => {
    let { username, image, lat, long } = req.body;

    _imageController
        .createInitialImage(username, image, lat, long,req.files)
        .then(data => {
            if(data) _imageController.jsonorxml(req, res, next, 200, data, 'image uploaded');
            else _imageController.jsonorxml(req, res, next, 500, data, 'Something went wrong');
        })
});

/**
 * @swagger
 * /images/{imageid}:
 *   post:
 *     description: Returns a single image
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *       - in: path
 *         name: imageid
 *       - in: header
 *         name: JWT token
 *     responses:
 *       200:
 *         description: returns image.
 *       500:
 *         description: image not found.
 *       401:
 *         description: User not authorized
 */
Router.get('/:imageid', (req: Request, res: Response, next: NextFunction) => {
    let { imageid } = req.params;

    _imageController
        .getImage({ 'path': imageid})
        .then(data => {
            if(data) _imageController.jsonorxml(req, res, next, 200, data, 'image was found');
            else _imageController.jsonorxml(req, res, next, 404, data, 'Something went wrong');
        });
})

Router.use('/:imageid/users/', UserRouter);

export default Router;