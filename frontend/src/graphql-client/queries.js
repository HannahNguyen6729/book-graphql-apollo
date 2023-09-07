import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(id: $bookId) {
      id
      name
      genre
      author {
        age
        name
        books {
          id
          name
        }
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      age
      name
      id
      books {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation CreateBook($authorId: ID!, $genre: String, $name: String) {
    createBook(authorId: $authorId, genre: $genre, name: $name) {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation CreateAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      name
      age
      id
      books {
        name
      }
    }
  }
`;
