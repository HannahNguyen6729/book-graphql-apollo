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
