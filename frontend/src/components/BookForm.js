import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../graphql-client/queries';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BookForm = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [newBook, setNewBook] = useState({ name: '', genre: '', authorId: '' });
  const [addBook, dataMutation] = useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook({ variables: newBook });

    setNewBook({
      name: '',
      genre: '',
      authorId: '',
    });
  };
  //console.log({ dataMutation });
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Book name"
            name="name"
            value={newBook.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Book genre"
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            onChange={handleChange}
            name="authorId"
            value={newBook.authorId}
          >
            <option disabled hidden value="">
              Select author
            </option>
            {data?.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="float-right" variant="info" type="submit">
          Add Book
        </Button>
      </Form>
    </>
  );
};

export default BookForm;
