import mongoose, { Schema } from 'mongoose';
import IUserGame from './UserGame.Interface';

const UserGameSchema: Schema<IUserGame> = new Schema(
    {
        player: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
        game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', require: true},
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image', require: true},
        points: {type: Number, required : true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserGame>('UserGame', UserGameSchema);