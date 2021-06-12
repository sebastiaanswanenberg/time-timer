import Controller from './Standard.Controller';

import IUser from '../models/User.Interface';
import UserModel from '../models/User.Model';

class UserController extends Controller {
    constructor() {
        super();
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            UserModel
                .find({})
                .then(users => {
                    return resolve(users);
                })
                .catch(err => {
                    reject(err);
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