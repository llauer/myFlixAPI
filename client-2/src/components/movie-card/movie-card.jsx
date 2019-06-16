import React from 'react';
import  { Row, Col, Button, Card, Container } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

            <Row>
              <Col>

                  <Card className="movieCard text-center card-body" border="primary">
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text className="card-text">{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button className="btn btn-outline-success" variant='link'>Info</Button>
                    </Link>
                  </Card.Body>
                  </Card>
              </Col>

              
            </Row>


    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,

};
