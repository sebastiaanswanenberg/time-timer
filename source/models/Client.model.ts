import mongoose, { Schema } from 'mongoose';
import IClient from './Client.Interface';

const ClientSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Clientname'},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IClient>('Client', ClientSchema);