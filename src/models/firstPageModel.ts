// first page mongoose model (project, report, title, auditDate, reportDate, auditors[], description, restrictions)

import { Schema, model, models } from "mongoose";

export type TFirstPage = {
    project: Schema.Types.ObjectId;
    report: Schema.Types.ObjectId;
    title: string;
    auditDate: Date;
    reportDate: Date;
    auditors: string[];
    description: string;
    restrictions: string;
} & Document;

const firstPageSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    auditDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    reportDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    auditors: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
    },
    restrictions: {
        type: String,
    }
});

firstPageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const FirstPage = models.FirstPage || model<TFirstPage>('FirstPage', firstPageSchema);

export default FirstPage;