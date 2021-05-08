import mongoose, { Schema } from 'mongoose';

const ProjectSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Projectname'},
        children: [TeamSchema],
        child: [ClientSchema]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProject>('Project', ProjectSchema);