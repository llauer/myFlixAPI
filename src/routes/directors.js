//jshint esversion:6

let express = require('express');

let router = express.Router();

router.get('/directors', (req, res) => {
  res.send('You have requested the directors');
});

// params property on request.
router.get('/directors/:name', (req, res) => {
  res.send(`You have requested the director: ${req.params.name}`);
});

module.exports = router;