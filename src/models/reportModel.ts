import { Document, Schema, model, models } from 'mongoose';

export interface IReport extends Document {
  project: Schema.Types.ObjectId;
  number: String;
  date: Date;
  description: string;
  pages: Schema.Types.ObjectId[];
}

const ReportSchema: Schema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required'],
  },
  number: {
    type: String,
    required: [true, 'Report number is required'],
  },
  date: {
    type: Date,
    required: [true, 'Report date is required'],
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Report description is required'],
  }
});

ReportSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

ReportSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

ReportSchema.virtual('pages', {
  ref: 'Page',
  localField: '_id',
  foreignField: 'report',
});

// populate pages
ReportSchema.pre(/^find/, function (next) {
  this.populate('pages');
  this.sort({ number: 1 });
  next();
});

const Report = models.Report || model<IReport>('Report', ReportSchema);


export default Report;