import mongoose, { Schema } from 'mongoose';
import IProject from './Project.interface';

const ProjectSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Projectname'},
        teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProject>('Project', ProjectSchema);