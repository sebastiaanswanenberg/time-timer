import { Document } from 'mongoose';
import  { Role } from './Role.Enum';

export default interface IUser extends Document {
    Username: String,
    Password: String,
    Role: Role,
    createdAt: Date,
    updatedAt: Date
}
