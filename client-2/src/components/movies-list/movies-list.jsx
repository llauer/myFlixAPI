import React from "react";
import { connect } from "react-redux";
import {Row} from "react-bootstrap"
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let sortedMovies = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
  });

  return { movies: sortedMovies };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return (
    <Row>
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Row>
  );
}

export default connect(mapStateToProps)(MoviesList);
