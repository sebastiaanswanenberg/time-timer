import mongoose, { Schema } from 'mongoose';
import UserSchema from '';

const TeamSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Teamname'},
        children: [UserSchema]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITeam>('Team', TeamSchema);