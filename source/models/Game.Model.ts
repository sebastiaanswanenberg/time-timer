import mongoose, { Schema } from 'mongoose';
import IGame from './Game.Interface';

const GameSchema: Schema<IGame> = new Schema(
    {
        gameUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        gameImage: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
        long: {type: Number, required: true},
        lat: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IGame>('Game', GameSchema);