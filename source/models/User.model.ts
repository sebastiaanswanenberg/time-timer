import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Username'},
        password: { type: String, required: true }
        role: { type: ROLE, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);