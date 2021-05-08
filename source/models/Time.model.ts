import mongoose, { Schema } from 'mongoose';

const TimeSchema: Schema = new Schema(
    {
        StartTime: { type: Date, required: true},
        EndTime: { type: Date},
        child: [UserSchema], [ProjectSchema]
    },
    {
        timestamps: true
    }
);

TimeSchema.index({StartTime: 1, EndTime: 1, }, {unique: true})

export default mongoose.model<ITime>('Time', TimeSchema);