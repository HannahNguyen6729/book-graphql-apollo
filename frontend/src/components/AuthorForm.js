import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { ADD_AUTHOR, GET_AUTHORS } from '../graphql-client/queries';

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({ name: '', age: '' });
  const { name, age } = newAuthor;

  const [addAuthor, dataMutation] = useMutation(ADD_AUTHOR, {
    refetchQueries: [GET_AUTHORS],
  });

  const handleInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.currentTarget.name]:
        e.currentTarget.name === 'age'
          ? Number(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    addAuthor({
      variables: newAuthor,
    });
    setNewAuthor({ name: '', age: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="invisible">
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="name"
          value={name}
          onChange={handleInputChange}
          required
          type="text"
          placeholder="Author name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="age"
          value={age}
          onChange={handleInputChange}
          required
          type="number"
          placeholder="Author age"
        />
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForm;
