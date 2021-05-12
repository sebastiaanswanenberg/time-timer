import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import lusca from 'lusca';
import session from 'express-session';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './config/swagger.json';
import swaggerJSDoc from 'swagger-jsdoc';

import config from './config/config';
import Logger from './util/logging';
import Router from './router';


/**
 * NODE KANBAN API
 *
 * A basic implementation of a kanban board api.
 * This file handles the basic server setup.
 *
 * @file app.ts
 * @author: Sebastiaan Swanenberg
 * @author: Mike damen
 * @since: v0.0.1
 */
class App {
    private NAMESPACE: string = 'SERVER';
    private httpServer: any;
    private SwaggerDoc: any;

    constructor() {
        this.httpServer = express();
        this.SwaggerDoc = swaggerJSDoc(swaggerDocument);

        this.DatabaseSetup();
        this.PassportSetup();

        this.httpServer.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer.use(bodyParser.json());
        this.httpServer.use(cors());
        this.httpServer.use(
            session({
                resave: true,
                saveUninitialized: true,
                secret: config.keys.session.cookieKey
            })
        );
        this.httpServer.use(lusca.xframe('SAMEORIGIN'));
        this.httpServer.use(lusca.xssProtection(true));

        new Router(this.httpServer);

        this.httpServer.use('/documentation', swaggerUi.serve, swaggerUi.setup(this.SwaggerDoc));
    }

    public Start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.httpServer
                .listen(port, () => {
                    resolve(port);
                })
                .on('error', (err: object) => reject(err));
        });
    };

    private DatabaseSetup = (): void => {
        mongoose
            .connect(config.mongo.url, config.mongo.options)
            .then((result) => {
                Logger.info(this.NAMESPACE, 'Mongo Connected');
            })
            .catch((error) => {
                Logger.error(this.NAMESPACE, error.message, error);
            });
    };

    private PassportSetup = () => {};
}

export default App;
