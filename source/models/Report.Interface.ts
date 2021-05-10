import { Document } from 'mongoose';

export default interface ITeam extends Document {
    Totalhours: Number,
    Totaldeclaredhours: Number,
    Averagetimeworked: Number,
    Hoursperteam: Array<Number>,
    createdAt: Date,
    updatedAt: Date
}