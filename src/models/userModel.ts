import { Document, Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
var validator = require('validator');

const UserSchema: Schema = new Schema({
    project: {
        type: String,
        required: [true, 'Project is required'],
        minlength: [3, 'Project name shout be longer than 3 characters'],
        maxlength: [30, 'Project name shout not be longer than 30 characters'],
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
        minlength: [5, 'Email shout be longer than 5 characters'],
        maxlength: [255, 'Email shout not be longer than 255 characters'],
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
        minlength: [3, 'Name shout be longer than 3 characters'],
        maxlength: [20, 'Name shout not be longer than 20 characters'],
    },
    department: {
        type: String,
        default: 'Not set',
        minlength: [3, 'Department name shout be longer than 3 characters'],
        maxlength: [
            50,
            'Department name shout not be longer than 50 characters',
        ],
    },
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
    email: string,
    password: string
) {
    const user = await User.findOne({ email: email }).exec();
    const compare = await bcrypt.compare(password, user!.password);
    if (compare) return user;
    else return false;
};

export default User;
