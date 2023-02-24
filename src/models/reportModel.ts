import { Document, Schema, model } from 'mongoose';

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

export default model<IReport>('Report', ReportSchema);