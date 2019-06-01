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
      newuser: false
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

  goMainView() {
    this.setState({
      selectedMovie: null
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
    this.setState((state, props) => {
      return {
        newUser: !state.newUser
      }
    });
  }


  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser) {
      
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} NewUser={() => this.RegisterUser()} />
    } else if (!user && newUser) {
      
      return <RegistrationView allReadyUser={() => this.RegisterUser()}/>
    } else if (user) {
      
      return (
        <Row className="mx-auto main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} goBack={() => this.goMainView()}/>
            : movies.map(movie => (
              <MovieCard movie={movie} onClick={movie => this.onMovieClick(movie)} />
              
            ))
          }
        </Row>
      );
    }
    
  }
}

