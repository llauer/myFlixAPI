//jshint esversion:6

const mongoose = require('mongoose');
const Models = require('../models.js');

const Movies = Models.Movie;

let express = require('express');

let router = express.Router();

router.get('/movies', (req, res) => {
  res.send("movies endpoint reached.");
});

router.get("/movies/:moviename", (req, res) => {
  res.send("movies by name endpoint reached.");
});
module.exports = router;