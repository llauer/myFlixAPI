/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint no-shadow: ["error", { "hoist": "functions" }] */
/* eslint-env es6 */
/* eslint-disable import/no-cycle */
import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
      // newUser: false,
    };
  }

  componentDidMount() {
    axios
      .get('https://myflixapi.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username
    );
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflixapi.herokuapp.com/movies',{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
      .catch (function (error) {
        console.log(error);
      });

  }

  goMainView() {
    this.setState({
      selectedMovie: null,
    });
  }

  toggleNewUserState() {
    this.setState((state, props) => ({
      newUser: !state.newUser,
    }));
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser) {
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          onNewHereLinkClicked={() => this.toggleNewUserState()}
        />
      );
    }
    if (!user && newUser) {
      return (
        <RegistrationView
          onAlreadyAUserLinkClicked={() => this.toggleNewUserState()}
          onUserRegistered={user => this.onLoggedIn(user)}
        />
      );
    }
    if (user) {
      return (
        <Container>
          <Row className="main-view">
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                goBack={() => this.goMainView()}
              />
            ) : (
              movies.map(movie => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={movie => this.onMovieClick(movie)}
                />
              ))
            )}
          </Row>
        </Container>
      );
    }
  }
}
