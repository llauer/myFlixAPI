import React from "react";
import PropTypes from "prop-types";
import { MainView } from "../main-view/main-view";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <button onClick={() => onClick()}>BACK</button>

      </div>
      
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  // onClick: PropTypes.func.isRequired
};
