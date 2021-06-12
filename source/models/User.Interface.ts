import { Document } from 'mongoose';
import IImage from './Image.Interface';

export default interface IUser extends Document {
    comparePassword(password: string): boolean;
    generateHash(password: string): string;
    Username: string,
    Password: string,
    Admin: Boolean,
    images: Array<IImage>,
    createdAt: Date,
    updatedAt: Date
}
