/* eslint-disable react/destructuring-assignment */
import axios from "axios";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://myflixapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    axios
      .put(
        `https://myflixapi.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
          FavoriteMovies: this.state.favoriteMovies
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Information Updated.");
        //update localStorage
        localStorage.setItem("user", this.state.usernameForm);
        this.getUser(localStorage.getItem("token"));
        document.getElementsByClassName("changeDataForm")[0].reset();
      })
      .catch(event => {
        console.log("Error updating your information");
        alert("Cannot continue. Something is wrong.");
      });
  }

  render() {
    const { username, email, birthday, favoriteMovies } = this.state;

    if (!username) return null;

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
              value={username}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              type="password"
              placeholder="Password"
              defaultValue="******"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Email"
              defaultValue={email}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              size="sm"
              // type="date"
              placeholder="MM-DD-YYYY"
              defaultValue={birthday}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regFavoriteMovies">
            <Form.Label>FavoriteMovies</Form.Label>
            <Form.Control
              size="sm"
              // type="date"
              placeholder="MovieID"
              defaultValue={favoriteMovies}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Button
            className="btn-lg btn-dark btn-block"
            type="submit"
            variant="primary"
            onClick={e => this.handleSubmit(e)}
          >
            Update
          </Button>
        </Form>
      </Container>
    );
  }
}

// RegistrationView.propTypes = {
//   onAlreadyAUserLinkClicked: PropTypes.func.isRequired
//   // onUserRegistered: PropTypes.func.isRequired
// };
