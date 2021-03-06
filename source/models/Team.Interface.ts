import { Document } from 'mongoose';
import IUser from './User.Interface';

export default interface ITeam extends Document {
    Teamname: String,
    Members: Array<IUser>,
    createdAt: Date,
    updatedAt: Date
}
