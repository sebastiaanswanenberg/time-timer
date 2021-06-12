import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import lusca from 'lusca';
import session from 'express-session';
import path from 'path';

import websocket from 'ws';
import http from 'http';

import { Server, Socket } from "socket.io";

/**
 * Swagger does not have a @types. Possible to make myself but i am lazy af!
 */

//import swaggerUi from 'swagger-ui-express';
//import swaggerJSDoc from 'swagger-jsdoc';
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');
import * as swaggerDocument from './config/swagger.json';

import config from './config/config';
import Logger from './util/logging';
import Router from './router';

import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT, { ExtractJwt } from 'passport-jwt';
import { NativeError } from "mongoose";

import UserModel from './models/User.Model';
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
    //private SwaggerDoc: any;

    constructor() {
        this.httpServer = express();
        //this.SwaggerDoc = swaggerJSDoc(swaggerDocument);

        this.DatabaseSetup();
        this.PassportSetup();
        this.WebsocketSetup();
        
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

        this.httpServer.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
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


    /**
     * Websocket setup.
     * 
     * 
     * [possible multiple room broadcast to make it scalable] - https://stackoverflow.com/questions/4445883/node-websocket-server-possible-to-have-multiple-separate-broadcasts-for-a-si
     * [Socket.io is not a websocket implemnetation]
     *  "Socket.IO is NOT a WebSocket implementation. 
     *   Although Socket.IO indeed uses WebSocket as a transport 
     *   when possible, it adds additional metadata to each packet. 
     *   That is why a WebSocket client will not be able to successfully 
     *   connect to a Socket.IO server, and a Socket.IO client will not be 
     *   able to connect to a plain WebSocket server either."
     *      - https://socket.io/docs/v4/ -> What Socket.IO is not
     * 
     *   [gist with useful code] - https://gist.github.com/crtr0/2896891
     * 
     */
    private WebsocketSetup = (): void => {
        const server = http.createServer(this.httpServer);

        //socket io implemenation
        const io = new Server(server);
        
        io.sockets.on('connection', (socket: Socket) => {
            // once a client has connected, we expect to get a ping from them saying what room they want to join
            socket.on('room', (room) => {
                socket.join(room);
                socket.to(room).emit('User Connected');
                Logger.info('socketio', `User Connected to ${room}`);
            });

            socket.on('private message', (anotherSocketId, msg) => {
                socket.to(anotherSocketId).emit("private message", socket.id, msg);
                Logger.info('socketio', `User Messaged ${anotherSocketId}: ${msg}`);
            });
        });

        //WS implementation (no rooms)        
        const wss_room_1 = new websocket.Server({ server, port: 8080 });
        wss_room_1.on('connection', (ws) => {
            ws.on('message', (data) => {
                wss_room_1.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) client.send(data);
                });
            });
            
            ws.on('open', () => {
                Logger.info('WEBSOCKET - Room 1', 'User Connected');
            });

            ws.on('close', () => {
                Logger.info('WEBSOCKET - Room 1', 'User Disconnected');
            });

            ws.on('error', (err) => {
                Logger.error('WEBSOCKET - Room 1', 'Error occured', err);
            });
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
            UserModel.findById(id, (err: NativeError, user: IUser) => done(err, user));
        });

        passport.use('local-signup', new LocalStrategy((username: string, password:string, done) => {
            process.nextTick(() => {
                UserModel.findOne({ 'username': username }, (err: any, user: IUser) => {
                    //Some random error
                    if(err) return done(err);

                    //User already exists
                    if(user) return done({message: 'Username is already taken'});

                    const newuser: IUser = new UserModel();

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
            UserModel.findOne({ 'username': username }, (err: any, user: IUser) => {
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
                return UserModel.findOne({username: jwtPayload.username})
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
