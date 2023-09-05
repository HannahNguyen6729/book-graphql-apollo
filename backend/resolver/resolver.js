// Resolvers define how to fetch the types defined in your schema.
import { mongoDataMethods } from '../data/db.js';

export const resolvers = {
  // QUERY
  Query: {
    books: async () => {
      return await mongoDataMethods.getAllBooks();
    },
    authors: async () => {
      return await mongoDataMethods.getAllAuthors();
    },
    book: async (parent, args) => {
      return await mongoDataMethods.getBookById(args.id);
    },
    author: async (parent, args) => {
      return await mongoDataMethods.getAuthorById(args.id);
    },
  },

  Book: {
    author: async (parent, args) => {
      return await mongoDataMethods.getAuthorById(parent.authorId);
    },
  },

  Author: {
    books: async (parent, args) => {
      return await mongoDataMethods.getAllBooks({ authorId: parent.id });
    },
  },

  //MUTATION
  Mutation: {
    createAuthor: async (parent, args) => {
      return await mongoDataMethods.createAuthor(args);
    },
    createBook: async (parent, args) => {
      return await mongoDataMethods.createBook(args);
    },
  },
};
