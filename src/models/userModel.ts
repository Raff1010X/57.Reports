import { Document, Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
var validator = require('validator');

const UserSchema: Schema = new Schema({
    project: {
        type: String,
        required: [true, 'Project is required.'],
        minlength: [3, 'Project name should be longer than 3 characters.'],
        maxlength: [30, 'Project name should not be longer than 30 characters.'],
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
            return bcrypt.hashSync(val, 10);
        },
    },
    name: {
        type: String,
        default: 'Not set',
        minlength: [3, 'Name should be longer than 3 characters.'],
        maxlength: [20, 'Name should not be longer than 20 characters.'],
    },
    department: {
        type: String,
        default: 'Not set',
        minlength: [3, 'Department name should be longer than 3 characters.'],
        maxlength: [
            50,
            'Department name should not be longer than 50 characters.',
        ],
    },
    active: {
        type: Boolean,
        default: false,
    },
    activator: {
        type: String,
    }
});

export interface IUser extends Document {
    project: string;
    email: string;
    password: string;
    name?: string;
    department?: string;
}

const User = models.User || model<IUser>('User', UserSchema);

UserSchema.statics.authenticate = async function (
    project: string,
    email: string,
    password: string
) {
    const user = await User.findOne({ project, email });
    if (!user) return false;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

export default User;
