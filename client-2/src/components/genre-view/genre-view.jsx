import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, logout } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <h1 className="genre">{genre.Name}</h1>
        <div className="description">{genre.Description}</div>
        <div>
        <Link to={'/'}>
          <Button className="movieBack btn btn-outline-success" variant="link" type="button">
            Back
          </Button>
          <Button className="logout btn btn-outline-danger" variant="link" onClick={() => logout()}>
            Logout
            </Button>
        </Link>
        </div>
      </div>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};
    
    
 

