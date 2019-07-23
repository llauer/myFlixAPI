import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./director-view.scss";
import { connect } from "react-redux";

class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { directorName, movies } = this.props;

    const director = movies.length > 0 ? movies.find(movie => movie.Director.Name === directorName).Director : null;

    if (!director) return null;

    return (
      <div className="director-view">
        <h1 className="director">{director.Name}</h1>
        <h2>Biography</h2>
        <div className="bio">{director.Bio}</div>
        <h2>Born</h2>
        <div className="birth">{director.Birth}</div>
        <h2>Died</h2>
        <div className="death">{director.Death}</div>
        <h2>Movies</h2>
        <div className="movies">{director.Movies}</div>
      </div>
    );
  }
}

export default connect(({ movies }) => ({ movies }))(DirectorView);

// DirectorView.propTypes = {
//   director: PropTypes.shape({
//     Name: PropTypes.string,
//     Bio: PropTypes.string,
//     Birth: PropTypes.string,
//     Death: PropTypes.string,
//     Movies: PropTypes.array
//   }).isRequired
// };
