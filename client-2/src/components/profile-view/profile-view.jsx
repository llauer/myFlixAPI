/* eslint-disable react/destructuring-assignment */
import axios from "axios";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./profile-view.scss";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // const isEnabled =
  //   username.length > 0 && password.length > 0 && email.length > 0;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.userInfo));
  }, []);

  console.log(userInfo);
  console.log({ email });

  const handleSubmit = e => {
    e.preventDefault();

    /* Send a request to the server for to creat the user. */
    axios
      .put(
        `https://myflixapi.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: userInfo.Username,
          Password: userInfo.Password,
          Email: userInfo.Email,
          Birthday: userInfo.Birthday
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(event => {
        console.log("Error updating your information.");
      });
  };

  if (userInfo) {
    return (
      <Container className="registration-view mt-10 mb-3">
        <h1 className="font-weight-bold text-center">myFlix</h1>
        <h3>Update Information</h3>
        <Form>
          <Form.Group controlId="regUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              autoFocus
              size="sm"
              type="text"
              placeholder="Desired Username"
              value={userInfo.Username}
              onChange={e => setUserInfo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="regPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              type="password"
              placeholder="Password"
              defaultValue="******"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="regEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Email"
              defaultValue={userInfo.Email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="regBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              size="sm"
              // type="date"
              placeholder="MM-DD-YYYY"
              defaultValue={userInfo.Birthday}
              onChange={e => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button
            className="btn-lg btn-dark btn-block"
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Form>
      </Container>
    );
  } else {
    return <div />;
  }
}

// RegistrationView.propTypes = {
//   onAlreadyAUserLinkClicked: PropTypes.func.isRequired
//   // onUserRegistered: PropTypes.func.isRequired
// };
