//jshint esversion:6

let express = require('express');

let router = express.Router();

router.get('/directors', (req, res) => {
  res.send('Directors endpoint reached.');
});

// params property on request.
router.get('/directors/:name', (req, res) => {
  res.send('Directors by name endpoint reached.');
});

module.exports = router;