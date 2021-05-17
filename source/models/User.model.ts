import mongoose, { Schema } from 'mongoose';
import { Role } from './Role.Enum';
import IUser from './User.Interface';
import bcrypt from 'bcrypt';

const UserSchema: Schema<IUser> = new Schema(
    {
        _id: { type: String, alias: 'Username'},
        Password: { type: String, required: true },
        Userrole: { type: String, enum : Role , default: 'user'}
    },
    {
        timestamps: true
    }
);

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
}

export default mongoose.model<IUser>('User', UserSchema);