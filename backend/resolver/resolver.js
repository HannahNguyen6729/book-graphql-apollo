// Resolvers define how to fetch the types defined in your schema.

import { authors, books } from '../data/static.js';

export const resolvers = {
  // QUERY
  Query: {
    books: () => books,
    authors: () => authors,
    book: (parent, args) => {
      // console.log({ parents, args });
      const findBook = books.find((book) => book.id == args.id);
      console.log({ findBook, args, parent });
      return findBook;
    },
    author: (parent, args) => {
      return authors.find((author) => author.id == args.id);
    },
  },

  Book: {
    author: (parent, args) => {
      console.log({ parent, args });
      return authors.find((author) => author.id == parent.authorId);
    },
  },

  Author: {
    books: (parent, args) => {
      console.log({ parent, args });
      return books.filter((book) => book.authorId == parent.id);
    },
  },

  //MUTATION
  Mutation: {
    createBook: (parent, args) => {
      console.log({ parent, args });
      const newBook = {
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      };
      return args;
    },
  },
};
