//jshint esversion:6

const express = require('express');
const uuid = require('uuid');
const app = express();

let users = [{
  id: 1,
  name: "Silent Bob",
  email: "funnyman@comicbooks.org",
  dateOfBirth: "05/16/1985",
  favoriteMovies: ['Jay and Silent Bob']
}];




//trying a new way of logging. Disabled morgan for now.
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});



//currently logging in UTC.
// app.use(morgan('common'));

let movieRoute = require('./routes/movies');
let directorsRoute = require('./routes/directors');
let genresRoute = require('./routes/genres');
let usersRoute = require('./routes/users');
// let documentation = require('./routes/documentation');

app.use(movieRoute);
app.use(directorsRoute);
app.use(genresRoute);
app.use(usersRoute);
app.use(express.json());
// app.use(documentation);

// logs requests to console
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

//serves up all static pages.
app.use(express.static('public'));

app.post('/users', (req, res) => {
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
//catches all not found urls.
app.all('*', function(req, res) {
  res.send('<h1>I am sorry I cannot find that.</h1>');
});

//error handeling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('<h1>Oooops somethings wrong!</h1>');
});

// grabs the port from the env or uses 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));