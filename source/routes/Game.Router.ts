import mongoose from 'mongoose';
import express from 'express';
import fileupload from 'express-fileupload';
import fs from 'fs';
//import deepai from 'deepai';

import IImage from '../models/Image.Interface';
import IUser from '../models/User.Interface';
import IGame from '../models/Image.Interface';
import IUserGame from '../models/UserGame.Interface';

import jsonxml from '../middleware/jsontoxml.middleware';

import gameController from '../controllers/Game.Controller';
import nearbyController from '../controllers/Nearby.controller';
import DeepAIController from '../controllers/Ai.Controller';

import imageRouter from '../routes/Image.Router';

const Router = express.Router();

Router.use(fileupload({ useTempFiles:true }));






export default Router;



Router.post("/try", function (req, res, next) {
    



    DeepAIController.createUserGame(req.files.sampleFile, req.body["id"], req.user.username).then(playerGame =>{
        jsonxml.sendMessage(req, res, playerGame, 200, 'Score');
    }).catch((err)=>{
        res.send(err);
    })  
});
