import { Document, Schema, model, models } from 'mongoose';

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
const Department = models.Department || model<IDepartment>('Department', DepartmentSchema);

export default Department;