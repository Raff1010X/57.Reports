// page layout mongoose model (project, header, footer)
import page from "@/pages/api/page";
import { Schema, model, models } from "mongoose";

export interface IPageLayout extends Document {
    project: Schema.Types.ObjectId;
    header: string;
    footer: string;
}

const pageLayoutSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project is required']
    },
    header: {
        type: String,
        maxLength: [1000, 'Header cannot be more than 1000 characters'],
        required: [true, 'Header is required'],
        default: ''
    },
    footer: {
        type: String,
        maxLength: [1000, 'Footer cannot be more than 1000 characters'],
        required: [true, 'Footer is required'],
        default: ''
    }
});

pageLayoutSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const PageLayout = models.PageLayout || model<IPageLayout>('PageLayout', pageLayoutSchema);

export default PageLayout;
