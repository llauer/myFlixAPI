// jshint esversion:6

const mongoose = require('mongoose');

const express = require('express');

const router = express.Router();

const passport = require('passport');
const Models = require('../models.js');

const Movies = Models.Movie;
require('../passport');

// GETs movies of a specific genre.
router.get(
  '/genres/:genre',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.genre }, 'Genre')
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
