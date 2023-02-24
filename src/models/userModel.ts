import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
    project: {
        type: String,
        required: [true, 'Project is required'],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 5,
        maxlength: 150,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        maxlength: 50,
        set: (val: string) => {
            return bcrypt.hashSync(val, 10);
        },
    },
    name: {
        type: String,
        default: '',
        minlength: 3,
        maxlength: 20,
    },
    department: {
        type: String,
        default: '',
        minlength: 3,
        maxlength: 50,
    },
});

export interface IUser extends Document {
    project: string;
    email: string;
    password: string;
    name?: string;
    department?: string;
}

const User = model<IUser>('User', UserSchema);

UserSchema.statics.authenticate = async function(email: string, password: string) {
    const user = await User.findOne({ email: email }).exec();
    const compare = await bcrypt.compare(password, user!.password);
    if (compare) return user;
    else return false;
};

export default User;
