import React from "react";
import axios from "axios";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ListGroup } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.Username,
      email: this.props.user.Email,
      birthday: this.props.user.Birthday,
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

    // const id = event.target.dataset.id;
    // const fMovies = this.state.favoriteMovies.map(movie => movie._id);

    // let newFavMovies = fMovies.filter(movie => {
    //   return id !== movie
    // })

    // console.log(newFavMovies)

    axios
      .put(
        `https://myflixapi.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
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
          username: null,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteFavorite(e, favMovie) {
    console.log(favMovie._id);

    axios
      .delete(
        `https://myflixapi.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/movies/${favMovie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        const newFavMovie = this.state.favoriteMovies.filter(newfaves => {
          return newfaves._id !== favMovie._id;
        });

        this.setState({
          favoriteMovies: [...newFavMovie]
        });

        console.log(response);
        alert("Favorite Movies Updated.");
      })
      .catch(event => {
        console.log("Error updating your favorite movies");
        alert("Cannot continue. Something is wrong.");
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
    console.log(this.state);

    return (
      <Container className="registration-view mt-10 mb-3">
        <h1 className="font-weight-bold text-center">myFlix</h1>
        <h3>Update Information</h3>
        <Form>
          <Form.Group>
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
        </Form>
        <h3 className="list-group-item-heading">Favorite Movies List</h3>

        <ListGroup>
          {favoriteMovies.map(favMovie => (
            <ListGroup.Item key={favMovie._id}>
              {favMovie.Title}

              <Button
                className="listGroup__delete--button btn-outline-danger"
                variant="link"
                data-id={favMovie._id}
                onClick={e => this.deleteFavorite(e, favMovie)}
              >
                X
              </Button>
            </ListGroup.Item>
          ))}

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
        </ListGroup>
      </Container>
    );
  }
}

// // RegistrationView.propTypes = {
// //   onAlreadyAUserLinkClicked: PropTypes.func.isRequired
// //   // onUserRegistered: PropTypes.func.isRequired
// // };
