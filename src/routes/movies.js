//jshint esversion:6

let express = require('express');

let router = express.Router();

let movies = [{

    "id": "1",
    "title": "Game Night",
    "year": "2018",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "ratings": [],
    "poster": "MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "contentRating": "11",
    "duration": "PT100M",
    "releaseDate": "2018-02-28",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
    "actors": [
      "Rachel McAdams",
      "Jesse Plemons",
      "Jason Bateman"
    ],
    "imdbRating": "",
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  },
  {
    "id": "2",
    "title": "Area X: Annihilation",
    "year": "2018",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "ratings": [],
    "poster": "MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg",
    "contentRating": "R",
    "duration": "",
    "releaseDate": "2018-02-23",
    "averageRating": 0,
    "originalTitle": "Annihilation",
    "storyline": "A biologist's husband disappears. She puts her name forward for an expedition into an environmental disaster zone, but does not find what she's expecting. The expedition team is made up of the biologist, an anthropologist, a psychologist, a surveyor, and a linguist.",
    "actors": [
      "Tessa Thompson",
      "Jennifer Jason Leigh",
      "Natalie Portman"
    ],
    "imdbRating": "",
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg"
  },
  {
    "id": "3",
    "title": "Hannah",
    "year": "2017",
    "genres": [
      "Drama"
    ],
    "poster": "MV5BNWJmMWIxMjQtZTk0Mi00YTE0LTkyNzAtYzQxYjcwYjE4ZDk2XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_SY500_SX350_AL_.jpg",
    "contentRating": "",
    "duration": "PT95M",
    "releaseDate": "2018-01-24",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "Intimate portrait of a woman drifting between reality and denial when she is left alone to grapple with the consequences of her husband's imprisonment.",
    "actors": [
      "Charlotte Rampling",
      "Andr\u00e9 Wilms",
      "St\u00e9phanie Van Vyve"
    ],
    "imdbRating": 6.5,
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNWJmMWIxMjQtZTk0Mi00YTE0LTkyNzAtYzQxYjcwYjE4ZDk2XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_SY500_SX350_AL_.jpg"
  },
  {
    "id": "22",
    "title": "Tomb Raider",
    "year": "2018",
    "genres": [
      "Action",
      "Adventure"
    ],
    "poster": "MV5BOTY4NDcyZGQtYmVlNy00ODgwLTljYTMtYzQ2OTE3NDhjODMwXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "contentRating": "PG-13",
    "duration": "",
    "releaseDate": "2018-03-16",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "Lara Croft is the fiercely independent daughter of an eccentric adventurer who vanished when she was scarcely a teen. Now a young woman of 21 without any real focus or purpose, Lara navigates the chaotic streets of trendy East London as a bike courier, barely making the rent, and takes college courses, rarely making it to class. Determined to forge her own path, she refuses to take the reins of her father's global empire just as staunchly as she rejects the idea that he's truly gone. Advised to face the facts and move forward after seven years without him, even Lara can't understand what drives her to finally solve the puzzle of his mysterious death. Going explicitly against his final wishes, she leaves everything she knows behind in search of her dad's last-known destination: a fabled tomb on a mythical island that might be somewhere off the coast of Japan. But her mission will not be an easy one; just reaching the island will be extremely treacherous. Suddenly, the stakes couldn't ...                Written by\nWarner Bros. Pictures",
    "actors": [
      "Alicia Vikander",
      "Hannah John-Kamen",
      "Walton Goggins"
    ],
    "imdbRating": "",
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BOTY4NDcyZGQtYmVlNy00ODgwLTljYTMtYzQ2OTE3NDhjODMwXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_SY500_CR0,0,337,500_AL_.jpg"
  },
  {
    "id": "30",
    "title": "Pacific Rim Uprising",
    "year": "2018",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "poster": "MV5BMjExMjM3MzM4NV5BMl5BanBnXkFtZTgwNjIyMzQ2NDM@._V1_SY500_CR0,0,315,500_AL_.jpg",
    "contentRating": "PG-13",
    "duration": "",
    "releaseDate": "2018-03-23",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.",
    "actors": [
      "Scott Eastwood",
      "Adria Arjona",
      "Tian Jing"
    ],
    "imdbRating": "",
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMjM3MzM4NV5BMl5BanBnXkFtZTgwNjIyMzQ2NDM@._V1_SY500_CR0,0,315,500_AL_.jpg"
  }

];
router.get('/movies', (req, res) => {
  // res.send('You have requested movies.');
  res.json(movies);
});

// params property on request.
// router.get('/movies/:name', (req, res) => {
// res.send(`You have requested the movie: ${req.params.name}`);
router.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
});
module.exports = router;