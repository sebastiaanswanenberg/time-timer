import mongoose, { Schema } from 'mongoose';
import ITime from './Time.Interface';
import { Timestate } from './Timestate.Enum';

const TimeSchema: Schema = new Schema(
    {
        Starttime: { type: Date, required: true},
        Endtime: { type: Date},
        User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        Project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
        State: { type: String, enum : Timestate , default: 'new'}
    },
    {
        timestamps: true
    }
);

TimeSchema.index({StartTime: 1, EndTime: 1, }, {unique: true})

export default mongoose.model<ITime>('Time', TimeSchema);