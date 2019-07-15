import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibilty-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return <div>
    <VisibilityFilterInput />
    <Container>
      <Row>
        {movies.map(movie => (
          <Col key={movie._id}>
            <MovieCard key={movie._id} movie={movie} />)}
          </Col>
        ))
        }
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
