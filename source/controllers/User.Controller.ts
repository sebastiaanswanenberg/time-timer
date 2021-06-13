import Controller from './Standard.Controller';

import IUser from '../models/User.Interface';
import UserModel from '../models/User.Model';
import UserGameModel from '../models/UserGame.Model';
import ImageModel from '../models/Image.Model';

class UserController extends Controller {
    constructor() {
        super();
    }

    getCurrentUserScore(username: any) {
        return new Promise((resolve, reject) => {
            let total:number = 0;
            UserModel
                .findOne(username)
                .then((user) => {
                    if(!user) reject();
                    else 
                    {
                        UserGameModel
                            .find({player: user})
                            .then((usergames) => {
                                usergames
                                    .forEach(usergame => {
                                        total += usergame.points;
                                    });

                                resolve(total);
                            })
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        });
    }

    getCurrentUserUploads(username: any) {
        return new Promise((resolve, reject) => {
            UserModel
                .findOne(username)
                .then((user) => {
                    if(!user) reject();
                    else 
                    {
                        ImageModel
                            .find({user: user})
                            .then((images) => {
                                resolve(images)
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            UserModel
                .find({})
                .then(users => {
                    return resolve(users);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    getUser(username: string) {
        return new Promise((resolve, reject) => {
            UserModel
                .findById(username)
                .then(user => {
                    return resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    updateUser(username:string, updatedUser: IUser) {
        return new Promise((resolve, reject) => {
            //hash password before updating.
            updatedUser.Password = updatedUser.generateHash(updatedUser.Password);

            UserModel
                .findByIdAndUpdate(username, updatedUser, { runValidators: true }, (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    deleteUser(username:string) {
        return new Promise((resolve, reject) => {
            UserModel
                .findById(username)
                .then(user => {
                    return resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

export default UserController;