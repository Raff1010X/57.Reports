import { Schema, model, models } from "mongoose";

export interface IPage extends Document {
    project: Schema.Types.ObjectId;
    report: Schema.Types.ObjectId;
    number: number;
    date: Date;
    description: string;
    place: string;
    status: boolean;
    image: string[];
    users: Schema.Types.ObjectId[];
}

const PageSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project is required'],
      },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: [true, 'Report is required'],
    },
    number: {
        type: Number,
        required: [true, 'Page number is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: [true, 'Page description is required'],
    },
    place : {
        type: String,
        required: [true, 'Page place is required'],
    },
    status : {
        type: Boolean,
        default: false,
    },
    image: [
        {
            type: String,
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
});

PageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

PageSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

PageSchema.pre(/^find/, function (next) {
    this.populate('users');
    next();
});

const Page = models.Page || model<IPage>('Page', PageSchema);

export default Page;
