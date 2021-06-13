import config from '../config/config';
import GameModel from '../models/Game.Model';
import ImageModel from '../models/Image.Model';
import UserModel from '../models/User.Model';
import Controller from './Standard.Controller';

const imgbbUploader = require("imgbb-uploader");

class ImageController extends Controller {
    constructor() {
        super();
    }
    
    createInitialImage(username: string, uploadedImage: any, lat: string, long: string, filearray?: any) {
        return new Promise((resolve, reject) => {
            
            //Scope based variable error when not declaren.
            //TODO: Why again? 
            let test = uploadedImage;
            if(filearray) reject();

            const options = {
                apiKey: config.keys.imgbb.apiKey,
                imagePath: filearray[0].tempFilePath
            }

            imgbbUploader(options)
                .then((res:any) => {
                    UserModel
                        .findOne({ "Username": username})
                        .then((person:any) => {
                            if (!person) resolve('this username does not exist');
					        else 
                            {
                                let uploadedImage = JSON.parse(test);
                                let image = new ImageModel({
                                    user: person,
                                    path: test.url,
                                    title: uploadedImage.title,
                                    description: uploadedImage.description
                                });

                                ImageModel
                                    .insertMany(image)
                                    .catch((err) => {
                                        reject(err);
                                    });

                                let game = new GameModel({
                                    gameUser: person,
                                    gameImage: image,
                                    long,
                                    lat
                                });

                                GameModel
                                    .insertMany(game)
                                    .then(() => {
                                        resolve(game);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    })

                            }
                        })


                })
                .catch((err: unknown) => {
                    resolve(err);
                });

            
        });
    }
    
    getImage(arg0: { path: string; }) {
        return new Promise((resolve, reject) => {
            ImageModel
                .findById(arg0)
                .then(image => {
                    return resolve(image);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
}

export default ImageController;