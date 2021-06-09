import { Document } from 'mongoose';
import IUser from './User.Interface';

export default interface IImage extends Document {
    path: string,
    title: string,
    user: IUser,
    distance: string
}