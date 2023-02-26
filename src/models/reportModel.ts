import { Document, Schema, model, models } from 'mongoose';

const ReportSchema: Schema = new Schema({
  project: {
    type: String, 
    required: [true, 'Project is required'],
    minlength: 3,
    maxlength: 30
  },

});

export interface IReport extends Document {
   project: string;

}
const Report = models.Report || model<IReport>('Report', ReportSchema);

export default Report;