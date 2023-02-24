import { Document, Schema, model } from 'mongoose';

const TestSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: [3, "Min lenght 3"],
    maxlength: [50, "Max lengh 50"]
  }
});

export interface ITest extends Document {
   name: string;
}

export default model<ITest>('Test', TestSchema);