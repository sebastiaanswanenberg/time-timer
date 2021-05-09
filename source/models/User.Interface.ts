import { Document } from 'mongoose';
import  { Role } from './Role.Enum';

export default interface ITime extends Document {
    Username: String,
    password: String,
    role: Role,
    createdAt: Date,
    updatedAt: Date
}
