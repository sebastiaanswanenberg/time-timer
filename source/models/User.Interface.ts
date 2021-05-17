import { Document } from 'mongoose';
import  { Role } from './Role.Enum';

export default interface IUser extends Document {
    comparePassword(password: string): boolean;
    generateHash(password: string): string;
    Username: string,
    Password: string,
    Role: Role,
    createdAt: Date,
    updatedAt: Date
}
