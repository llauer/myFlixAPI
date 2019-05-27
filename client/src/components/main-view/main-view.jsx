import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  componentDidMount() {
    axios
      .get("https://myflixapi.herokuapp.com/movies")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  goMainView() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  RegisterUser() {
    this.setState({
      newUser: true
    });
  }
  UserRegistered() {
    this.setState({
      newUser: null
    });
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (newUser)
      return (
        <RegistrationView UserRegistered={() => this.UserRegistered()} OnLoggedIn={user => this.OnLoggedIn(user)} />
      );
    else
      return (
        <LoginView
          OnLoggedIn={user => this.OnLoggedIn(user)}
          NewUser={() => this.RegisterUser()}
          UserRegistered={() => this.UserRegistered()}
        />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      // <div className="main-view">
      //   {selectedMovie ? (
      //     <MovieView movie={selectedMovie} onClick={button => this.goMainView()} />
      //   ) : (
      //     movies.map(movie => <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />)
      //   )}
      // </div>
      <Container className="main-view" fluid="true">
        <Row>
          {selectedMovie ? (
            <Col>
              <MovieView returnCallback={() => this.ResetMainView()} movie={selectedMovie} />
            </Col>
          ) : (
            movies.map(movie => {
              return (
                <Col xl={3} sm={6} md={4} xs={12}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.OnMovieClick(movie)} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    );
  }
}
