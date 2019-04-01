# REST API myFlix

To build the server­side component of a “movies” web application. The web application will
provide users with access to information about different movies, directors, and genres. Users
will be able to sign up, update their personal information, and create a list of their favorite
movies.

## Example Failure Response

`{
  "status": {
    "code": 400,
    "errorType": "bad_request",
    "errorDetails": "JSON request is missing"
  }
}`

## Example Success Response

`{
  "status": {
    "code": 200,
    "errorType": "success"
  }
}`


## Get list of Movies

### Endpoint

`/movies/`

### Request

`GET /movies/`

## Response

The response will be a list of JSON objects. Each will represent a movie.

## Get movie by name

## Endpoint

`/movies/:moviename`

## Request

`GET /movies/:moviename`

### Response

The response will be a JSON object of a specifc movie. It will contain id, title, year, genres, image URL, storyline, director.

{
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
}

## Get a list of directors

### Endpoint

`/directors`

### Request

`GET /directors/`

### Response

A JSON object containing a list of directors including name, bio, year of birth, year of death.

## Get a director by name

## Endpoint

`/directors/:name`

## Request

`GET /directors/:name`

## response

JSON payload of a specific director by name including bio, date of birth and date of death.

## Get Genres

## Endpoint

`/genres/`

## Request

`GET /genres/`

### Response

Response is a list of JSON objects displaying the different movie genres.

``[
{"name": "comedy", "description": "Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered."}
];``

## Get Genres by name

## Endpoint

`/genres/:genresName`

## Request

`GET /genres/:genresName`

### Response

This will return a JSON object of a specific movie genre by name and description.

``[
{"name": "comedy", "description": "Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered."}
];``

## Get users registration information.

## Endpoint

`/users`

## Request

`GET /users/`

### Response

if authorized/implemented a list of JSON objects would be returned.

{
  {
      "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
      "name": "Silent Bobs Friend Jay",
      "email": "funnyman2@comicbooks.org",
      "dateOfBirth": "05/16/1985",
      "favoriteMovies": "Jay and Silent Bob Strike back"

  },

  {
    "id": "db3b25a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Bobby Smith",
    "email": "bsmith99@bademail.com",
    "dateOfBirth": "05/16/1989",
    "favoriteMovies": "The Matrix"
  }

};

## Get user by name


## Endpoint

`/users/:name`

## Request

`GET /users/:name`

### Response
{
  "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
  "name": "Some Person",
  "email": "anybody@testeremail.org",
  "dateOfBirth": "05/16/1975",
  "favoriteMovies": "Harry Potter"
};

## Get users favorites by name

## Endpoint

`/users/:name/favorites`

## Request

`GET /users/:name/favorites`

### Response
A JSON object of a specific users favorite movies.

{
  "name": "Peter Jackson",
  "favoriteMovies": "King Kong"
};

## Update users favorites.

## Endpoint

`/users/:name/favorites/:movieName`

## Request

`POST /users/:name/favorites/:movieName`

### Response

A JSON object of a specific movie to add to a users-favorites table.

``{
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
}``

A success or failure will also be returned.

## Delete a movie from a users favorites.

## Endpoint

`/users/:name/favorites/:movieName`

## Request

`DELETE /users/:name/favorites/:movieName`

### Response

A success or failure will also be returned.

## Create a new user

### Endpoint

`/users`

## Request

`POST /users`

### Request

A JSON object containing id, name, email, date of birth and favorite movies. The information is to be added to the message body of the HTTP request. A success or failure will also be returned.

``{
    "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Silent Bobs Friend Jay",
    "email": "funnyman2@comicbooks.org",
    "dateOfBirth": "05/16/1985",
    "favoriteMovies": "Jay and Silent Bob Strike back"
}``

## Response

A success or failure will also be returned.

## Allow a user to de-register.

## Endpoint

`/users/:name`

### Request

`DELETE /users/:name`

### Response
A response of success or failure of deleting a specific user.

## update a users password/email/dateOfBirth

### Endpoint

`/users/:name`

### Request

`PUT /users/:name`

email, new passord would be send within the body of the request
{"name": "Steve", "email": "newemail@stevesplace.io", "date_of_birth": ''######", "password": "*******"}

### Response

A success or failure will also be returned.



*update a user password/email/dateOfBirth*

*Endpoint:*
PUT /users/:name

*Request*
email, new passord would be send within the body of the request
{"name": "Steve", "email": "newemail@stevesplace.io", "date_of_birth": ''...", "password": "asdasd"}

*Response*
A success or failure will also be returned.
