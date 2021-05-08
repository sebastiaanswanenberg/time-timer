import mongoose, { Schema } from 'mongoose';

const ClientSchema: Schema = new Schema(
    {
        _id: { type: String, alias: 'Clientname'},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Client>('Client', ClientSchema);