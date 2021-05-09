import mongoose, { Schema } from 'mongoose';

const TimeSchema: Schema = new Schema(
    {
        StartTime: { type: Date, required: true},
        EndTime: { type: Date},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
    },
    {
        timestamps: true
    }
);

TimeSchema.index({StartTime: 1, EndTime: 1, }, {unique: true})

export default mongoose.model<ITime>('Time', TimeSchema);