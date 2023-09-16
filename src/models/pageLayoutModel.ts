// page layout mongoose model (project, header, bottom)
import page from "@/pages/api/page";
import { Schema, model, models } from "mongoose";

export interface IPageLayout extends Document {
    project: Schema.Types.ObjectId;
    header: string;
    bottom: string;
}

const pageLayoutSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    header: {
        type: String,
        maxLength: [1000, 'Header cannot be more than 1000 characters']
    },
    bottom: {
        type: String,
        maxLength: [1000, 'Bottom cannot be more than 1000 characters']
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

const PageLayout = models.PageLayout || model<IPageLayout>('Page', pageLayoutSchema);

export default PageLayout;
