//jshint esversion:6

let express = require('express');

let router = express.Router();


router.get('/genres', (req, res) => {
  res.send('You have requested genres');
});

// params property on request.
router.get('/genres/:name', (req, res) => {
  res.send(`You have requested the genre: ${req.params.name}`);
});

module.exports = router;