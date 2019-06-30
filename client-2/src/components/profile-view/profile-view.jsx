import React from "react";
import axios from "axios";
import moment, { isMoment } from "moment";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.username);
    // console.log(this.state.password);
    // console.log(this.state.birthday);
    // console.log(this.state.email);
    // console.log(this.state.favoriteMovies);
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
        localStorage.setItem("user", this.state.username);
        this.getUser(localStorage.getItem("token"));
      })
      .catch(event => {
        console.log("Error updating your information");
        alert("Cannot continue. Something is wrong.");
      });
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
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteUser(event) {
    event.preventDefault();
    axios
      .delete(
        `https://myflixapi.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        alert("Account Deleted");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch(event => {
        alert("There was a problem trying to delete the user.");
      });
  }

  render() {
    const { username, email, birthday, password, favoriteMovies } = this.state;

    // if (!username) return null;

    return (
      <Container className="registration-view mt-10 mb-3">
        <h1 className="font-weight-bold text-center">myFlix</h1>
        <h3>Update Information</h3>
        <Form>
          <Form.Group controlId="regUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              name="username"
              autoFocus
              size="sm"
              type="text"
              placeholder="Desired Username"
              defaultValue={username}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              size="sm"
              type="password"
              placeholder="Please Enter Password"
              defaultValue={password}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="regEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
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
              name="birthday"
              size="sm"
              type="date"
              placeholder="YYYY-MM-DD"
              value={moment(birthday).format("YYYY-MM-DD")}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>

          <h3 class="list-group-item-heading">Favorite Movies List</h3>

          <ListGroup controlId="regFavoriteMovies">
            {favoriteMovies.map(favMovie => (
              <div>
              <ListGroup.Item>{favMovie}</ListGroup.Item>

              </div>

            )
            )}


            {/* <Form.Control
              name="favoriteMovies"
              size="sm"
              type="text"
              placeholder="MovieID"
              defaultValue={favoriteMovies}
              onChange={e => this.handleChange(e)}
            /> */}
          </ListGroup>
          <Button
            className="btn-lg btn-dark btn-block"
            type="submit"
            variant="primary"
            onClick={e => this.handleSubmit(e)}
          >
            Update
          </Button>
          <Button
            className="btn-lg btn-block"
            type="submit"
            variant="danger"
            onClick={e => this.deleteUser(e)}
          >
            Delete Account
          </Button>
        </Form>
      </Container>
    );
  }
}

// /* eslint-disable react/destructuring-assignment */
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import "./profile-view.scss";

// export class ProfileView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       username: null,
//       password: null,
//       email: null,
//       birthday: false,
//       favoriteMovies: null
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user")
//       });
//       this.getUser(accessToken);
//     }
//   }

//   getUser(token) {
//     let username = localStorage.getItem("user");
//     axios
//       .get(`https://myflixapi.herokuapp.com/users/${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         this.setState({
//           username: response.data.Username,
//           password: response.data.Password,
//           email: response.data.Email,
//           birthday: response.data.Birthday,
//           favoriteMovies: response.data.favoriteMovies
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     console.log(this.state.username);
//     console.log(this.state.password);
//     console.log(this.state.birthday);
//     console.log(this.state.email);
//     console.log(this.state.favoriteMovies);
//     axios
//       .put(
//         `https://myflixapi.herokuapp.com/users/${localStorage.getItem("user")}`,
//         {
//           Username: this.state.username,
//           Password: this.state.password,
//           Email: this.state.email,
//           Birthday: this.state.birthday,
//           FavoriteMovies: this.state.favoriteMovies
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         }
//       )
//       .then(response => {
//         console.log(response);
//         alert("Information Updated.");
//         //update localStorage
//         localStorage.setItem("user", this.state.username);
//         this.getUser(localStorage.getItem("token"));
//       })
//       .catch(event => {
//         console.log("Error updating your information");
//         alert("Cannot continue. Something is wrong.");
//       });
//   }

//   render() {
//     const { username, email, birthday, favoriteMovies } = this.state;

//     if (!username) return null;

//     return (
//       <Container className="registration-view mt-10 mb-3">
//         <h1 className="font-weight-bold text-center">myFlix</h1>
//         <h3>Update Information</h3>
//         <Form>
//           <Form.Group controlId="regUsername">
//             <Form.Label>Username:</Form.Label>
//             <Form.Control
//               autoFocus
//               size="sm"
//               type="text"
//               placeholder="Desired Username"
//               value={username}
//               onChange={e => this.handleChange(e)}
//             />
//           </Form.Group>
//           <Form.Group controlId="regPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               size="sm"
//               type="password"
//               placeholder="Password"
//               defaultValue="******"
//               onChange={e => this.handleChange(e)}
//             />
//           </Form.Group>
//           <Form.Group controlId="regEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               size="sm"
//               type="email"
//               placeholder="Email"
//               defaultValue={email}
//               onChange={e => this.handleChange(e)}
//             />
//           </Form.Group>
//           <Form.Group controlId="regBirthday">
//             <Form.Label>Birthday</Form.Label>
//             <Form.Control
//               size="sm"
//               // type="date"
//               placeholder="MM-DD-YYYY"
//               defaultValue={birthday}
//               onChange={e => this.handleChange(e)}
//             />
//           </Form.Group>
//           <Form.Group controlId="regFavoriteMovies">
//             <Form.Label>FavoriteMovies</Form.Label>
//             <Form.Control
//               size="sm"
//               // type="date"
//               placeholder="MovieID"
//               defaultValue={favoriteMovies}
//               onChange={e => this.handleChange(e)}
//             />
//           </Form.Group>
//           <Button
//             className="btn-lg btn-dark btn-block"
//             type="submit"
//             variant="primary"
//             onClick={e => this.handleSubmit(e)}
//           >
//             Update
//           </Button>
//         </Form>
//       </Container>
//     );
//   }
// }

// // RegistrationView.propTypes = {
// //   onAlreadyAUserLinkClicked: PropTypes.func.isRequired
// //   // onUserRegistered: PropTypes.func.isRequired
// // };
