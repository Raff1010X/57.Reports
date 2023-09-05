import { Schema, Model, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
var validator = require('validator');

export interface IUser {
    project: Schema.Types.ObjectId;
    email: string;
    password: string;
    name?: string;
    active?: boolean;
    activator?: string;
}

interface IUserMethods {
    authenticate(
        password: string
    ): boolean;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (email: any) {
                return validator.isEmail(email);
            },
            message: '{VALUE} this is not a valid email address.',
        },
        minlength: [5, 'Email should be longer than 5 characters.'],
        maxlength: [255, 'Email should not be longer than 255 characters.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        set: (val: string) => {
            if (val.startsWith('$2a$10$', 0)) return val
            else return bcrypt.hashSync(val, 10);
        },
    },
    name: {
        type: String,
        default: 'Not set',
        minlength: [3, 'Name should be longer than 3 characters.'],
        maxlength: [20, 'Name should not be longer than 20 characters.'],
    },
    active: {
        type: Boolean,
        default: false,
    },
    activator: {
        type: String,
        default: ''
    },
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
});

UserSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    }
});

UserSchema.methods.authenticate = function authenticate(password: string) {
    const compare = bcrypt.compareSync(password, this.password);
    return compare;
};

const User = models.User || model<IUser, UserModel>('User', UserSchema);

export default User;
