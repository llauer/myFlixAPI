//jshint esversion:6

const mongoose = require("mongoose");
const Models = require("../models.js");

const Movies = Models.Movie;

let express = require("express");

let router = express.Router();

const passport = require("passport");
require("../passport");

// GET all movies
router.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then(movies => {
        res.status(201).json(movies);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// GET movie by title
router.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.title })
      .then(movie => {
        res.status(201).json(movie);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);
module.exports = router;
