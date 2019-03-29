//jshint esversion:6

let express = require('express');

let router = express.Router();

// const uuid = require("uuid");

let users = [{
  id: 1,
  name: "Silent Bob",
  email: "funnyman@comicbooks.org",
  dateOfBirth: "05/16/1985",
  favoriteMovies: ['Jay and Silent Bob']
}];
router.post('/', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing user data in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});
// router.get('/users', (req, res) => {
//   res.send('You have requested the User Registration Page');
//   // res.json(users);
//   // next();
// });

router.get('/users', (req, res) => {
  // res.send('You have requested the User Registration Page');
  res.json(users);
  next();
});

// params property on request.
router.get('/users/:name', (req, res) => {
  res.send(`You have requested the profile: ${req.params.name}`);
});

// params property on request.
router.get('/users/:name/favorites', (req, res) => {
  res.send(`You have requested: ${req.params.name}'s favorites`);
});

// router.post('/users', (req, res) => {
//   let newUser = req.body;
//
//   if (!newUser.name) {
//     const message = "Missing name in request body";
//     res.status(400).send(message);
//   } else {
//     newUser.id = uuid.v4();
//     users.push(newUser);
//     res.status(201).send(newUser);
//   }
// });

module.exports = router;