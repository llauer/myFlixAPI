import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./genre-view.scss";

class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genreName, movies } = this.props;

    const genre =
      movies.length > 0
        ? movies.find(movie => movie.Genre.Name === genreName).Genre
        : null;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <h1 className="genre">{genre.Name}</h1>
        <div className="description">{genre.Description}</div>
      </div>
    );
  }
}

export default connect(({ movies }) => ({ movies }))(GenreView);

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};
