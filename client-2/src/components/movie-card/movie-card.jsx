import React from 'react';
import  { Row, Col, Button, Card, CardDeck } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      // <div className="card text-center">
      //   <div className="overflow">
      //     <img src={movie.ImagePath} alt="Movie Poster"/>
      //   </div>
      //   <div className="card-body text-dark"></div>
      //   <h4 className="card-title">{movie.Title}</h4>
      //   <p className="card-text text-secondary">{movie.Description}</p>
      //   <Link to={`/movies/${movie._id}`}>
      //   <Button className="btn btn-outline-success" variant='link'>Info</Button></Link>
      // </div>
    

      
        
          <CardDeck>
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
            <Card className="movieCard text-center card-body" border="primary" style={{ flex: 1 }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text className="card-text">{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="btn btn-outline-success" variant='link'>Info</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="movieCard text-center card-body" border="primary" style={{ flex: 1 }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text className="card-text">{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="btn btn-outline-success" variant='link'>Info</Button>
                </Link>
              </Card.Body>
            </Card>
          </CardDeck>
  
     
      
      
        
          
          
      
     
      
      

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
