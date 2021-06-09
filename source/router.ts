import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authMiddleware from './middleware/auth.middleware';
import fileupload from 'express-fileupload';

import PassportRouter from './routes/Passport.Router';
import UserRouter from './routes/User.Router'
import GamesRouter from './routes/Game.Router';
import ImagesRouter from './routes/Image.Router';


class Router {
    constructor(server: express.Express) {
        const router = express.Router();
        
        router.use('/auth', PassportRouter);

        router.use('/users', passport.authenticate('jwt'), authMiddleware, UserRouter);
        router.use('/games', passport.authenticate('jwt'), GamesRouter);
        router.use('/images', passport.authenticate('jwt'), ImagesRouter);
        
        router.use(fileupload({
            useTempFiles:true
        }));

        /**
         * General purpose routes
         */

        /**
         * @swagger
         * /favicon.ico:
         *    get:
         *      tags:
         *          - Basic Pages
         *      summary: Should return a 204 because there is no favicon.
         *      consumes:
         *        - application/json
         *      responses:
         *        204:
         *          description: Currently there is no favicon for the api. This will however return that there is none to make sure the browser does not throw an error in the console.
         */
        router.use('/favicon.ico', (req, res) => res.status(204).send());
        
        router.use('/test', (req, res) =>
        {
            res.status(200)
                .json({
                    message: "IT WORKS!"
                })
                .send()
        });


        server.use('/', router);
    }
}
export default Router;

