import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishYear: {
    type: Number,
    required: true
  }},
  {
    timestamps: true,
  }
)
 
const bookModel = model("book", bookSchema)

export default bookModel;