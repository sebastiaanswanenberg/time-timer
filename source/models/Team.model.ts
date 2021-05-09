import mongoose, { Schema } from 'mongoose';
import ITeam from './Team.Interface';

const TeamSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Teamname'},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITeam>('Team', TeamSchema);