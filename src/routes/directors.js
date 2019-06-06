// jshint esversion:6

const mongoose = require('mongoose');

const express = require('express');

const router = express.Router();

const passport = require('passport');
const Models = require('../models');

const Movies = Models.Movie;
require('../passport');

// GETs movies by director
router.get(
  '/directors/:director',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.director }, 'Director')
      .then(movies => {
        res.status(201).json(movies);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
      });
  }
);

module.exports = router;
