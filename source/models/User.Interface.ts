import { Document } from 'mongoose';

export default interface IUser extends Document {
    comparePassword(password: string): boolean;
    generateHash(password: string): string;
    Username: string,
    Password: string,
    Admin: Boolean,
    createdAt: Date,
    updatedAt: Date
}
