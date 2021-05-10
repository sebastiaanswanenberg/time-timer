import mongoose, { Schema } from 'mongoose';
import IReport from './Report.Interface';

const ReportSchema: Schema = new Schema(
    {
        Totalhours: { type: Number },
        Totaldeclaredhours: { type: Number },
        Averagetimeworked: { type: Number },
        Hoursperteam: { type: Array }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReport>('Report', ReportSchema);