/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint no-shadow: ["error", { "hoist": "functions" }] */
/* eslint-env es6 */
/* eslint-disable import/no-cycle */
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Container } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

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
      selectedMovieId: movie,
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

  onLogOut() {
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
        this.setState({
          movies: response.data
        });
      })
      .catch(err => {
        console.error(err);
      });
      
  }

  goMainView() {
    this.setState({
      selectedMovieId: null,
    });
  }

  toggleNewUserState() {
    this.setState((state, props) => ({
      newUser: !state.newUser,
    }));
  }



  render() {
    const { movies, user, newUser } = this.state;

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
      )
    }
    if (!user && newUser) {
      return (
        <RegistrationView
          onAlreadyAUserLinkClicked={() => this.toggleNewUserState()}
          onUserRegistered={user => this.onLoggedIn(user)}
        />
      );
    }

    if (!movies || !movies.length) return <div className="main-view" />
    
    return (
      <Router>

        <div className="main-view">

          <Route exact path="/" render={() => {
            if (!user) {
              return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            } else {
              return movies.map(movie => <MovieCard key={movie._id} movie={movie} />);
            }
          }} />

          <Route exact path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieID)} logout={() => this.onLogOut()} />} />

          <Route path='/register' render={() => <RegistrationView />} />
          

          {/* <Route path="/directors/:director" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view" />;
            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director } />
          }
          } /> */}

          <Route path="/director/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view" />;
            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} logout={() => this.onLogOut()} />
          }
          } />


          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view" />;
            return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} logout={() => this.onLogOut()}/>
          }
          } />

          {/* <Route path="/genres/:genre" render={() => <GenreView />} /> */}

          <Route path="/profile" render={() => <ProfileView movies={this.state.movies} />} />

          


        </div>
      </Router>
      
      
    );
  }
}
