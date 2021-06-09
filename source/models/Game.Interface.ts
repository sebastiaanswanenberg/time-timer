import { Document } from 'mongoose';
import IImage from './Image.Interface';
import IUser from './User.Interface';

export default interface IGame extends Document {
    gameUser: IUser,
    gameImage: IImage,
    long: Number,
    lat: Number
}