//jshint esversion:6

let express = require('express');

let router = express.Router();

router.get('/users', (req, res) => {
  res.send('You have requested the User Registration Page');
});

// params property on request.
router.get('/users/:name', (req, res) => {
  res.send(`You have requested the profile: ${req.params.name}`);
});

// params property on request.
router.get('/users/:name/favorites', (req, res) => {
  res.send(`You have requested: ${req.params.name}'s favorites`);
});
module.exports = router;