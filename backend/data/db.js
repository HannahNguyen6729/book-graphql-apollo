import { AuthorModel } from '../models/AuthorModel.js';
import { BookModel } from '../models/BookModel.js';

export const mongoDataMethods = {
  getAllBooks: async (condition) => {
    return condition === null
      ? await BookModel.find()
      : await BookModel.find(condition);
  },
  getAllAuthors: async () => {
    return await AuthorModel.find();
  },
  getBookById: async (id) => {
    return await BookModel.findById(id);
  },
  getAuthorById: async (id) => {
    return await AuthorModel.findById(id);
  },
  createAuthor: async (args) => {
    const newAuthor = new AuthorModel(args);
    await newAuthor.save();
    return newAuthor;
  },
  createBook: async (args) => {
    const newBook = new BookModel(args);
    await newBook.save();
    return newBook;
  },
};
