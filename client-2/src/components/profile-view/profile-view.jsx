import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';


import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { eventNames } from 'cluster';


export class ProfileView extends React.Component {

  constructor() {
    super();


    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      usernameForm: null,
    }
  
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://myflixapi.herokuapp.com/users/${username}`, {
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
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteUser(event) {
    event.preventDefault();
    axios.delete(`https://myflixapi.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Sorry to see you go. Account Removed.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(event => {
        alert('Error when trying to process your request.');
      });
  }
  deleteMovie(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios.delete(`https://myflixapi.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favoriteMovie}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert('Error! Cannot process your request at this time.');
      });
  }
  handleChange(event) {
    this.setState({[ event.target.name ]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    axios.put(`https://myflixapi.herokuapp.com/users/${localStorage.getItem('user')}`, {
      Username: this.state.username,
      Password: this.state.password,
      Email: this.state.email,
      Birthday: this.state.birthday
    }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response);
        alert('Your information has been updated.');
        localStorage.setItem('user', this.state.usernameForm);        
        this.getUser(localStorage.getItem('token'));
        document.getElementsByClassName('changeDataForm')[0].reset();
      })
      .catch(event => {
        
        alert('Error! Cannot process your request at this time.');

      });
  };

    render() {
      const { username, email, birthday, password, favoriteMovies } = this.state;



      return (
        <Container className="registration-view mt-10 mb-3">
          <h1 className="font-weight-bold text-center">myFlix</h1>
          <h3>Update Here</h3>
          <Form>
            <Form.Group controlId="regUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                autoFocus
                size="sm"
                type="text"
                placeholder="Desired Username"
                value=""
                onChange={event => this.handleChange(event)}
              />
            </Form.Group>
            <Form.Group controlId="regPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                placeholder="Password"
                value=""
                onChange={event => this.handleChange(event)}
              />
            </Form.Group>
            <Form.Group controlId="regEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Email"
                value=""
                onChange={event => this.handleChange(event)}
              />
            </Form.Group>
            <Form.Group controlId="regBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                placeholder="MM-DD-YYYY"
                value=""
                onChange={event => this.handleChange(event)}
              />
            </Form.Group>
            <Button
              // disabled={!isEnabled}
              className="btn-lg btn-dark btn-block"
              type="submit"
              variant="primary"
              // onClick={SuccessfulRegistration}
            >
              Update
        </Button>
          </Form>
        </Container>
      );
  }
}

