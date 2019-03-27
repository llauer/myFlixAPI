//jshint esversion:6

const express = require('express');

const app = express();


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
// app.use(documentation);

app.use((req, res, next) => {
  console.log(`${new Date().toString()}`);
  next();
});

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

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));