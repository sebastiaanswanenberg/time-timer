import fs from 'fs';

import {Readable} from 'stream';
import StreamBuffers from 'stream-buffers';
import base64 from 'base64-stream';
import dotenv from 'dotenv';

/**
 * No @types availible. Maby an option to make them myself but this works for now. 
 */
//import deepai from 'deepai';
//import imgbbUploader from 'imgbbUploader';
const deepai = require("deepai")
const imgbbUploader = require("imgbb-uploader");

import IImage from '../models/Image.Interface';
import IUser from '../models/User.Interface';
import IGame from '../models/Game.Interface';
import IUserGame from '../models/UserGame.Interface';

import config from '../config/config';
import fileUpload from 'express-fileupload';
import UserGameModel from '../models/UserGame.Model';
import UserModel from '../models/User.Model';
import GameModel from '../models/Game.Model';
import ImageModel from '../models/Image.Model';
import Controller from './Standard.Controller';

/**
 * Deep ai controller functions.
 * 
 * [example code] - https://github.com/deepai-org/deepai-js-client
 * 
 * 
 * 
 * @returns deepai controller
 */

class DeepAiController extends Controller {
    createUserGame(image:any, gameid:any, username:string) {
        return new Promise((resolve, reject) => {
            //Set some variables we will need later.
            let currentGameUser: IUser,
                currentGame: IGame,
                currentUserGame: IUserGame,
                currentImage: IImage;

            deepai.setApiKey(config.keys.deepai.apiKey);

            const imgbboptions = {
                apiKey:config.keys.imgbb.apiKey,
                imagePath: image.tempFilePath
            };

            //Upload the image to imgbb.
            imgbbUploader(imgbboptions)
                .then((responce:any) => {
                    //Find the user that is playing the game. Does this user exist?
                    UserModel.findById({ "username": username })
                        .then(user => {
                            //check is user exists. 
                            if(user) currentGameUser = user;
                            else reject();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    
                    //Find the current game by id.
                    GameModel.findById(gameid)
                        .then(game => {
                            if(game)
                            {
                                currentGame = game;
                                currentUserGame.game = currentGame
                            }
                            currentUserGame.player = currentGameUser;
                        })
                        .catch((err) => {
                            reject(err);
                        });

                    ImageModel.findById(currentGame.gameImage)
                        .then(image => {
                            if(image) currentImage = image;
                            else reject();

                            (async function () {
                                let deepaires = await deepai.callStandardApi("image-similarity", {
                                    image1: responce.image.url,
                                    image2: currentImage.path
                                })
                                Math.round(deepaires);

                                //Calculate points based on de responce of the deep ai.
                                //the more simalarities the more points (rounded down: dont want to deal with wierd overly large numbers)
                                let points: number = Math.floor(Math.round(100/deepaires));
                                currentUserGame.points = (points > 0) ? points : 0;
                                
                                UserGameModel.insertMany(currentUserGame);
                                resolve(currentUserGame);
                            })()
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
        });
    }

}

export default DeepAiController;