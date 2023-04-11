
import { model, models } from 'mongoose';
import { IUser, UserModel, UserSchema } from './userModel';

const SuperUser = models.SuperUser || model<IUser, UserModel>('SuperUser', UserSchema);

export default SuperUser