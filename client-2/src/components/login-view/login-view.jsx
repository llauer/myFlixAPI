/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isEnabled = username.length > 0 && password.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixapi.herokuapp.com/login',{
      Username: username,
      Password: password,
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      console.log(data);
    })
    .catch(e => {
      alert('Username or Password is incorrect')
    });
  };

  return (

      <Container className="login-form">
        <h1 className="font-weight-bold text-center">myFlix</h1>
        <h3>Login</h3>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
          <Form.Control
              autoFocus
              required
              size="sm"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              required
              size="sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            disabled={!isEnabled}
            className="btn-lg btn-dark btn-block"
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Log In
          </Button>

          <Button variant="link" onClick={props.onNewHereLinkClicked}>
            New Here?
          </Button>
        </Form>
      </Container>
    );
  }



LoginView.propTypes = {
  // onNewHereLinkClicked: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
