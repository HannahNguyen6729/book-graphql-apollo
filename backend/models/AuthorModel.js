import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

export const AuthorModel = mongoose.model('AuthorModel', AuthorSchema);
