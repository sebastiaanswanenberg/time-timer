import { Document } from 'mongoose';

export default interface IClient extends Document {
    Clientname:String,
    createdAt: Date,
    updatedAt: Date
}
