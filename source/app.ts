import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import lusca from 'lusca';
import session from 'express-session';
import path from 'path';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './config/swagger.json';
import swaggerJSDoc from 'swagger-jsdoc';

import config from './config/config';
import Logger from './util/logging';
import Router from './router';

import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT, { ExtractJwt } from 'passport-jwt';
import { NativeError } from "mongoose";

import User from './models/User.Model';
import IUser from './models/User.Interface';


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
        
        this.httpServer.use(express.static(path.join(__dirname, 'public')));
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

    private PassportSetup = () => {
        const LocalStrategy = passportLocal.Strategy;
        const JWTStrategy = passportJWT.Strategy;
        
        passport.serializeUser<any, any>((req, user, done) => {
            done(undefined, user);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, (err: NativeError, user: IUser) => done(err, user));
        });

        passport.use('local-signup', new LocalStrategy((username: string, password:string, done) => {
            process.nextTick(() => {
                User.findOne({ 'username': username }, (err: any, user: IUser) => {
                    //Some random error
                    if(err) return done(err);

                    //User already exists
                    if(user) return done({message: 'Username is already taken'});

                    const newuser = new User();

                    newuser.Username = username;
                    newuser.Password = newuser.generateHash(password);
                    
                    newuser
                        .save(() => {
                            done(null, newuser)
                        });
                }).catch((err) => {
                    done(err);
                });
            })
        }));

        passport.use('local-login', new LocalStrategy((username: string, password:string, done) => {
            User.findOne({ 'username': username }, (err: any, user: IUser) => {
                if (!user || !user.comparePassword(password)) return done(null, false);

                return done(null, user);
            }).catch((err) => {
                done(err);
            });
        }));

        passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.server.token.secret
            }, (jwtPayload, done) => {
                return User.findOne({username: jwtPayload.username})
                    .then(user => {
                        return done(null, user);
                    })
                    .catch(err => {
                        return done(err);
                    });
            }
        ));

    };
}

export default App;
