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
import { BrowserRouter as Router, Route } from "react-router-dom";
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovieId: null,
      user: null,
      newUser: false,
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();
  
    // eslint-disable-next-line no-undef
    handleNewHash = () => {
      const movieId = window.location.hash.replace(
        /^#\/?|\/$/g, '').split('/');

        this.setState({
          selectedMovieId: movieId[0]
        });
      
    }
    
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    window.location.hash = '#' + movie._id;
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

  onLogOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null
    });
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
    const { movies, selectedMovieId, user, newUser } = this.state;

    if (!user && !newUser) {
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          onNewHereLinkClicked={() => this.toggleNewUserState()}
        />
      );
    }
    if (!movies || !movies.length) return <div className="main-view"/>
      const selectedMovie = selectedMovieId ? movies.find(m => m._id === selectedMovieId) : null;

      return (
        <div className="main-view">
          {selectedMovie ? <MovieView movie={selectedMovie}/> : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
          }
        </div>
      );
    
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
                logout={() => this.onLogOut()}
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
