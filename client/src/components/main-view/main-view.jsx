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
      newuser: null
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


  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser) {
      
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} NewUser={() => this.RegisterUser()} />
    } else if (!user && newUser) {
      
      return <RegistrationView />
    } else if (user) {
      
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} />
            : movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
            ))
          }
        </div>
      );
    }
    
  }
}

