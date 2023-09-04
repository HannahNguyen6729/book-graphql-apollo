import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorId: {
    type: String,
  },
});

export const BookModel = mongoose.model('BookModel', BookSchema);
