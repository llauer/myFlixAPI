//jshint esversion:6

let express = require('express');

let router = express.Router();

// const uuid = require("uuid");

let users = [{
  id: 1,
  name: "Silent Bob",
  email: "funnyman@comicbooks.org",
  date_of_birth: "05/16/1985",
  favoriteMovies: ['Jay and Silent Bob']
}];
// router.post('/', (req, res) => {
//   let newUser = req.body;
//
//   if (!newUser.name) {
//     const message = 'Missing user data in request body';
//     res.status(400).send(message);
//   } else {
//     newUser.id = uuid.v4();
//     users.push(newUser);
//     res.status(201).send(newUser);
//   }
// });

router.get('/users', (req, res) => {
  // res.send('You have requested the User Registration Page');
  res.json(users);

});

// params property on request.
router.get('/users/:name', (req, res) => {
  res.send(`You have requested the profile: ${req.params.name}`);
});

// testing
router.get('/users/:name/test', (req, res) => {
  res.json(`You have requested: ${req.params.email}'s test`);
});

// params property on request.
router.get('/users/:name/favorites', (req, res) => {
  res.send(`You have requested: ${req.params.name}'s favorites`);
});

router.post('/users', (req, res) => {
  res.send("You have reached the create a user endpoint.");
});

router.post('/users/:name/favorites/:movieName', (req, res) => {
  res.send("Add favorite movies endpoint reached.");
});

router.delete('/users/:name/favorites/:movieName', (req, res) => {
  res.send("Delete favorite movies endpoint reached.");
});

router.delete('/users/:name', (req, res) => {
  res.send("Delete user by name endpoint reached.");
});


router.put('/users/:name/:email/:date_of_birth', (req, res) => {
  res.send(`You have found the update page for ${req.params.name}`);
});
// router.put('/users/:name/:email/:date_of_birth', (req, res) => {
//   let user = users.find((user) => {
//     return user.name === req.params.name
//   });
//
//   if (user) {
//     user.email = req.params.email;
//     user.date_of_birth = req.params.date_of_birth;
//     res.status(201).send("User " + req.params.name + " email changed " + req.params.email + " and date of birth to " + req.params.date_of_birth);
//   } else {
//     res.status(404).send("User: " + req.params.name + "  was not found.")
//   }
// });
//create a user


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