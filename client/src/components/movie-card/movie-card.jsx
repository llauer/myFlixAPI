import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import "./movie-card.scss";
export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <Col key={movie.Title}>
        <Card.Img style={{width: "250px"}}  src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)}>
            Info
          </Button>
        </Card.Body>
      </Col>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string
//   }).isRequired,
//   onClick: PropTypes.func.isRequired
// };
