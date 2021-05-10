import mongoose, { Schema } from 'mongoose';
import IProject from './Project.Interface';

const ProjectSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Projectname'},
        Teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
        Client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProject>('Project', ProjectSchema);