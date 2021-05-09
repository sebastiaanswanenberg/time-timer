import { Document } from 'mongoose';
import IProject from './Project.interface';
import IUser from './User.Interface';

export default interface ITime extends Document {
    StartTime: Date,
    EndTime: Date,
    user: IUser,
    project: IProject
    createdAt: Date,
    updatedAt: Date
}
