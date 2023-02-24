import { Document, Schema, model } from 'mongoose';

const DepartmentSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50
  }
});

export interface IDepartment extends Document {
   name: string;
}

export default model<IDepartment>('Department', DepartmentSchema);