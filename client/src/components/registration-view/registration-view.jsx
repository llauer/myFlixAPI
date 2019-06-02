import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const SuccessfulRegistration = e => {
    e.preventDefault();
    props.onUserRegistered(username);
  };

  return (
    <Container className="registration-view mt-10 mb-3">
      <h1 className="font-weight-bold text-center">myFlix</h1>
      <h3>Register Here</h3>
      <Form>
        <Form.Group controlId="regUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            autoFocus
            size="sm"
            type="text"
            placeholder="Desired Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="regPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="regEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="regBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            size="sm"
            type="date"
            placeholder="MM-DD-YYYY"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button className="btn-lg btn-dark btn-block" type="submit" variant="primary" onClick={SuccessfulRegistration}>
          Register
        </Button>
        <Button variant="link" onClick={props.allReadyUser}>
          Have a logon?
          </Button>
        
      </Form>
    </Container>
  );
}
