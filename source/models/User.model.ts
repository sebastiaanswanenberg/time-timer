import mongoose, { Schema } from 'mongoose';
import { Role } from './Role.Enum';
import IUser from './User.Interface';

const UserSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Username'},
        Password: { type: String, required: true },
        Userrole: { type: String, enum : Role , default: 'user'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);