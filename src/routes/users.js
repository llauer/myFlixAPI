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

router.get('/users', (req, res) => {
  // res.send('You have requested the User Registration Page');
  res.json(users);

});

// params property on request.
router.get('/users/:name', (req, res) => {
  res.send(`You have requested the profile: ${req.params.name}`);
});

// params property on request.
router.get('/users/:name/favorites', (req, res) => {
  res.send(`You have requested: ${req.params.name}'s favorites`);
});

router.post('/users', (req, res) => {
  res.send("You have reached the create a user endpoint.");
});

//Add a user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
}*/
// router.post('/users', (req, res) => {
//   console.log(req)
// Users.findOne({
//     Username: req.body.Username
//   })
//   .then(function(user) {
//     if (user) {
//       return res.status(400).send(req.body.Username + "already exists");
//     } else {
//       Users
//         .create({
//           Username: req.body.Username,
//           Password: req.body.Password,
//           Email: req.body.Email,
//           Birthday: req.body.Birthday
//         })
//         .then(function(user) {
//           res.status(201).json(user)
//         })
//         .catch(function(error) {
//           console.error(error);
//           res.status(500).send("Error: " + error);
//         })
//     }
//   }).catch(function(error) {
//     console.error(error);
//     res.status(500).send("Error: " + error);
//   });
// });
//Add a user
/* We'll expect JSON in this format
{
  ID : Integer,
  Username : String,
  Password : String,
  Email : String,
  Birthday : Date
}*/

router.post('/users/:name/favorites/:movieName', (req, res) => {
  res.send("Add favorite movies endpoint reached.");
});

router.delete('/users/:name/favorites/:movieName', (req, res) => {
  res.send("Delete favorite movies endpoint reached.");
});

router.delete('/users/:name', (req, res) => {
  res.send("Delete user by name endpoint reached.");
});

router.put('/users/:name', (req, res) => {
  res.send("Update users information endpoint reached.");
});

module.exports = router;