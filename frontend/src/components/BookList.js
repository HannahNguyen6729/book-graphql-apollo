import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql-client/queries.js';

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState(null);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleClick = (id) => {
    setBookId(id);
  };

  return (
    <Row>
      <Col xs={8}>
        <CardColumns>
          {data?.books.map((book) => (
            <Card
              key={book.id}
              border="info"
              text="info"
              className="text-center shadow"
              onClick={() => handleClick(book.id)}
            >
              <Card.Body>{book.name}</Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Col>
      <Col>
        <BookDetails bookId={bookId} />
      </Col>
    </Row>
  );
};

export default BookList;
