import { Document } from 'mongoose';
import IClient from './Client.Interface';
import ITeam from './Team.Interface';

export default interface IProject extends Document {
    Projectname: String,
    teams: Array<ITeam>,
    client: IClient
    createdAt: Date,
    updatedAt: Date
}
