// import React from "react";
// import { connect } from "react-redux";

// function MovieView(props) {
//   const { movies, movieId } = props;

//   if (!movies || !movies.length) return null;

//   const movie = movies.find(m => m._id == movieId);

//   return (
//     <div className="movie-view">
//       <div className="movie-title">{movie.Title}</div>
//       <div className="movie-imagepath">{movie.ImagePath}</div>
//       <div className="movie-description">{movie.Description}</div>
//     </div>
//   );
// }

// export default connect(({ movies }) => ({ movies }))(MovieView);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";

// function MovieView(props) {
//   const { movies, movieId } = props;

//   if (!movies || !movies.length) return null;
//   const movie = movies.find(m => m._id == movieId);
class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
             const { movies, movieId, logout } = this.props;

             const movie = movies.find(m => m._id == movieId);

             if (!movie) return null;

             return (
               <div className="movie-view text-center">
                 <div className="movie-title">
                   <h1 className="">{movie.Title}</h1>
                 </div>
                 <hr className="my-2" />
                 <img
                   className="rounded movie-poster"
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
                   <Link to={`/genres/${movie.Genre.Name}`}>
                     <Button
                       className="btn btn-outline-success"
                       variant="link"
                     >
                       Info
                     </Button>
                   </Link>
                 </div>
                 <hr className="my-2" />
                 <div className="movie-director">
                   <h3 className="label">Director</h3>
                   <div className="value">{movie.Director.Name}</div>
                   <Link to={`/director/${movie.Director.Name}`}>
                     <Button
                       className="btn btn-outline-success"
                       variant="link"
                     >
                       Info
                     </Button>
                   </Link>
                 </div>
               </div>
             );
           }
}
export default connect(({ movies }) => ({ movies }))(MovieView);

MovieView.propTypes = {
  // movie: PropTypes.shape({
  //   Title: PropTypes.string.isRequired,
  //   ImagePath: PropTypes.string.isRequired,
  //   Description: PropTypes.string.isRequired,
  //   Genre: PropTypes.shape({
  //     Name: PropTypes.string.isRequired
  //   }).isRequired,
  //   Director: PropTypes.shape({
  //     Name: PropTypes.string.isRequired
  //   }).isRequired
  // }).isRequired
};
