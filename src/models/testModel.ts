import { Document, Schema, model, models } from 'mongoose';

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
const Test = models.Test || model<ITest>('Test', TestSchema);

export default Test;