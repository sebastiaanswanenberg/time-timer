import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

class Router {
    constructor(server: express.Express) {
        const router = express.Router();

        
        

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

        server.use('/', router);
    }
}
export default Router;
