import React from "react";
import PropTypes from "prop-types";
import { MainView } from "../main-view/main-view";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { movie, goBack } = this.props;

    if (!movie) return null;

    return (
      <Col className="text-center">
      <Jumbotron>
        <div className="movie-title">
          {/* <div className="label">Title</div> */}
          <h1 className="display-3">{movie.Title}</h1>
        </div>
        <hr className="my-2" />
        <img className="rounded mb-0 movie-poster" src={movie.ImagePath} />
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
        <Button className="movieBack" onClick={() => goBack()}>Back</Button>

      </Jumbotron>
      </Col>
      
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
