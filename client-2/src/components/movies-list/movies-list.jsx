import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== "") {
    moviesToShow = moviesToShow.filter(m => m.Title.includes(visibilityFilter));
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <Row>
        <VisibilityFilterInput />

        {movies.map(m => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </Row>
    </div>
  );
}

//   return (
//     <Row>
//       {movies.map(movie => (
//         <MovieCard key={movie._id} movie={movie} />
//       ))}
//     </Row>
//   );
// }

export default connect(mapStateToProps)(MoviesList);
