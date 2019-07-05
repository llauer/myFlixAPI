import React from "react";
import { Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Col className="movies-col">
        <Card className="movieCard">
          <Card.Img className="movies-img" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movies-title">{movie.Title}</Card.Title>
            <Card.Text className="card-text movies-text">
              {movie.Description}
            </Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button className="btn-outline-success" variant="link">
                Info
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};
