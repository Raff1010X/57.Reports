import { Document, Schema, model, models } from 'mongoose';
import { IUser } from './userModel';
import { IReport } from './reportModel';
import { ISuperUser } from './superUserModel';

export interface IProject extends Document {
    name: string;
    users: IUser[];
    reports: IReport[];
    superUsers: ISuperUser[];
}

const ProjectSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required.'],
            minlength: [3, 'Project name should be longer than 3 characters.'],
            maxlength: [
                30,
                'Project name should not be longer than 30 characters.',
            ],
            unique: [true, 'Project name should be unique.']
        },

    },
);

ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

ProjectSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});


// virtuals for reports
ProjectSchema.virtual('reports', {
    ref: 'Report',
    localField: '_id',
    foreignField: 'project',
});

// virtuals for users
ProjectSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'project',
});

// virtuals for superusers
ProjectSchema.virtual('superUsers', {
    ref: 'SuperUser',
    localField: '_id',
    foreignField: 'project',
});

// populate virtuals
ProjectSchema.pre(/^find/, function (next) {
    this.populate('reports');
    this.populate('users');
    this.populate('superUsers');
    next();
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;