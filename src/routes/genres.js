//jshint esversion:6

let express = require('express');

let router = express.Router();


router.get('/genres', (req, res) => {
  res.send('Genres endpoint reached.');
});

router.get('/genres/:name', (req, res) => {
  res.send('Get Genres by name endpoint reached.');
});

module.exports = router;