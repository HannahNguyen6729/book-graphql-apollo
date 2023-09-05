import React from 'react';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../graphql-client/queries.js';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId: bookId },
    skip: bookId === null,
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const book = bookId !== null ? data.book : null;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text> Please select a book</Card.Text>
        ) : (
          <>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle> {book.genre} </Card.Subtitle>

            <p>{book.author.name}</p>
            <p>Age: {book.author.age}</p>
            <p>All books by this author</p>

            <ul>
              {book.author.books.map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
