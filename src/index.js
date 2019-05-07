//jshint esversion:6

const mongoose = require('mongoose');

const Models = require('./models.js');

// mongoose.connect("mongodb://localhost:27017/myFlixDB", {
//   useNewUrlParser: true
// });

mongoose.connect('mongodb+srv://myFlixDBadmin:71fPMtsAvjups7aT@myflixdb-mmibf.mongodb.net/myFlixDB?retryWrites=true', {
  useNewUrlParser: true
});

const validator = require('express-validator');

const express = require('express');
const uuid = require('uuid');

const cors = require('cors'); //added for validation

const app = express();
app.use(express.json());

const passport = require('passport');
require('./passport');

//trying a new way of logging. Disabled morgan for now.
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

let movieRoute = require('./routes/movies');
let directorsRoute = require('./routes/directors');
let genresRoute = require('./routes/genres');
let usersRoute = require('./routes/users');
let authRoute = require('./routes/auth');
// let documentation = require('./routes/documentation');

app.use(movieRoute);
app.use(directorsRoute);
app.use(genresRoute);
app.use(usersRoute);
app.use(authRoute);
app.use(cors());
app.use(validator()); //added for validation

//currently logging in UTC.
// app.use(morgan('common'));

//serves up all static pages.
app.use(express.static('public'));

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

app.listen(PORT, '0.0.0.0', () => console.info(`Server has started on port ${PORT}`));
