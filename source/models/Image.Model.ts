import mongoose, { Schema } from 'mongoose';
import IImage from './Image.Interface';
import IUser from './User.Interface';

const ImageSchema: Schema<IImage> = new Schema(
    {
        _id: {type: String, required: true, alias: 'path'},
        title: {type: String, required: true},
        distance: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IImage>('Image', ImageSchema);