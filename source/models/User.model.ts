import mongoose, { Schema } from 'mongoose';
import IUser from './User.Interface';
import bcrypt from 'bcrypt';

const UserSchema: Schema<IUser> = new Schema(
    {
        _id: { type: String, alias: 'Username'},
        Password: { type: String, required: true },
        Admin: {type: Boolean, required: true, default: false},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
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