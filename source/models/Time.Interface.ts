import { Document } from 'mongoose';
import IProject from './Project.Interface';
import IUser from './User.Interface';

export default interface ITime extends Document {
    StartTime: Date,
    EndTime: Date,
    User: IUser,
    Project: IProject
    createdAt: Date,
    updatedAt: Date
}
