import { Document } from 'mongoose';
import IGame from './Game.Interface';
import IImage from './Image.Interface';
import IUser from './User.Interface';

export default interface IUserGame extends Document {
    player: IUser,
    game: IGame,
    image: IImage,
    points: number
}