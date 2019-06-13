/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint no-shadow: ["error", { "hoist": "functions" }] */
/* eslint-env es6 */
/* eslint-disable import/no-cycle */
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem}  from 'react-bootstrap';
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

    this.goBack = this.goBack.bind(this);

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
  goBack() {
    this.props.history.goBack();
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

        
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Welcome Back, { user }!</a>
              </li>
            </ul>
          </div>
          <div class="mx-auto order-0">
            <a class="navbar-brand mx-auto" href="#">MyFlix</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link to={'/'} className="font-weight-bold nav-link">Back</Link>
              </li>
              <li class="nav-item">
                <Link to={'/'} className="font-weight-bold nav-link " onClick={() => this.onLogOut()}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        
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
