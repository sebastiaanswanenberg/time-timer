import mongoose, { Schema } from 'mongoose';
import { Role } from './Role.Enum';
import IUser from './User.Interface';

const UserSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Username'},
        password: { type: String, required: true },
        role: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);