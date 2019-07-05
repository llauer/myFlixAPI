import React from "react";
import { connect } from "react-redux";
import "./movie-view.scss";

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;
  const movie = movies.find(movie => movie._id === movieId);

  return (
    <div className="movie-view">
      <div className="movie-title">{movie.Title}</div>
      <div className="movie-imagepath">{movie.ImagePath}</div>
      <div className="movie-description">{movie.Description}</div>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);

// export class MovieView extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     const { movie } = this.props;

//     if (!movie) return null;

//

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }).isRequired
//   }).isRequired
// };
