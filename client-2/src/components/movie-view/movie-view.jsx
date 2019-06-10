import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Jumbotron } from 'react-bootstrap'
import './movie-view.scss';
import { Link } from 'react-router-dom'



export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { movie, logout } = this.props;

    if (!movie) return null;

    return (
      <Col className="container row col-sm">
        <Jumbotron fluid>
          <div className="movie-title">
            <h1 className="display-3">{movie.Title}</h1>
          </div>
          <hr className="my-2" />
          <img
            className="rounded mb-0 movie-poster"
            src={movie.ImagePath}
            alt="Movie Poster"
          />
          <div className="lead movie-description">
            <h3 className="label">Description</h3>
            <div className="value">{movie.Description}</div>
          </div>
          <hr className="my-2" />
          <div className="movie-genre">
            <h3 className="label">Genre</h3>
            <div className="value">{movie.Genre.Name}</div>
          </div>
          <hr className="my-2" />
          <div className="movie-director">
            <h3 className="label">Director</h3>
            <div className="value">{movie.Director.Name}</div>
          </div>
          <Link to={'/'}>
          <Button className="movieBack" variant="primary" type="button">
            Back
          </Button>
          </Link>

          <Button className="logout" onClick={() => logout()}>
            Logout
          </Button>
        </Jumbotron>
      </Col>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
