# **REST API myFlix**

To build the server­side component of a “movies” web application. The web application will
provide users with access to information about different movies, directors, and genres. Users
will be able to sign up, update their personal information, and create a list of their favorite
movies.

##### Example Failure Response

`{
  "status": {
    "code": 400,
    "errorType": "bad_request",
    "errorDetails": "JSON request is missing"
  }
}`

##### Example Success Response

`{
  "status": {
    "code": 200,
    "errorType": "success"
  }
}`

# Get list of Movies

##### Endpoint

`GET /movies/`

##### Response

The response will be an array of JSON objects. Each will represent a movie.

`[
  {
      "id": "1",
      "title": "Game Night",
      "year": "2018",
      "genres": [
          "Action",
          "Comedy",
          "Crime"
      ],
      "directors": "John Francis Daley, Jonathan Goldstein",
      "storyline": "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
      "image": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  }
]`

# Get movie by name

##### Endpoint

`GET /movies/:moviename`

##### Response

The response will be a JSON object of a specifc movie. It will contain id, title, year, genres, image URL, storyline, director.

`{
    "id": "1",
    "title": "Game Night",
    "year": "2018",
    "genres": [
        "Action",
        "Comedy",
        "Crime"
    ],
    "directors": "John Francis Daley, Jonathan Goldstein",
    "storyline": "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
    "image": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
}`

# Get a list of directors

##### Endpoint

`GET /directors/`

##### Response

A JSON object containing a list of directors including name, bio, year of birth, year of death.

`[{
    "name": "Quentin Tarantino",
    "bio": "Born in Tennessee in 1963, Quentin Tarantino moved to California at age 4. His love of movies led to a job in a video store, during which time he wrote the scripts for True Romance and Natural Born Killers. ",
    "yearBorn": "1963",
    "yearDied": "N/A"
}]`

# Get a director by name

##### Endpoint

`GET /directors/:name`

##### response

JSON object of a specific director by name including bio, date of birth and date of death.

`{
    "name": "Quentin Tarantino",
    "bio": "Born in Tennessee in 1963, Quentin Tarantino moved to California at age 4. His love of movies led to a job in a video store, during which time he wrote the scripts for True Romance and Natural Born Killers. ",
    "yearBorn": "1963",
    "yearDied": "N/A"
}`

# Get Genres

##### Endpoint

`GET /genres/`

##### Response

Response is a list of JSON objects displaying the different movie genres.

`[
{"name": "comedy", "description": "Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered."}
];`

# Get Genre by name

##### Endpoint

`GET /genres/:genreName`

##### Response

This will return a JSON object of a specific movie genre by name and description.

`{"name": "comedy", "description": "Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered."}
;`

# Get a list of user information.

##### Endpoint

`GET /users/`

##### Response

if authorized/implemented a list of JSON objects would be returned.

`[{      "id": "db3b25a6-23a8-47c2-aaec-5d4649286bdf",
      "name": "Bobby Smith",
      "email": "bsmith99@bademail.com",
      "dateOfBirth": "05/16/1989",
      "favoriteMovies": ["The Matrix"]
}]`

# Get user by name

##### Endpoint

`GET /users/:name`

##### Response
`{
  "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
  "name": "Some Person",
  "email": "anybody@testeremail.org",
  "dateOfBirth": "05/16/1975",
  "favoriteMovies": ["Harry Potter"]
}`

# Get users favorites by name

##### Endpoint

`GET /users/:name/favorites`

##### Response
A JSON object of a specific users favorite movies.

`{
  "name": "Peter Jackson",
  "favoriteMovies": ["King Kong"]
}`
# Add favorite movie for a user.

##### Endpoint

`POST /users/:name/favorites/:movieName`

##### Response

A success or failure will also be returned.

# Delete a movie from a users favorites.

##### Endpoint

`DELETE /users/:name/favorites/:movieName`

##### Response

A success or failure will also be returned.

# User sign up

##### Endpoint

`POST /users`

##### Request

A JSON object containing id, name, email, date of birth and favorite movies. The information is to be added to the message body of the HTTP request. A success or failure will also be returned.

``{
    "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Silent Bobs Friend Jay",
    "email": "funnyman2@comicbooks.org",
    "dateOfBirth": "05/16/1985"
}``

##### Response

A success or failure will also be returned.

# Allow a user to de-register.

##### Endpoint

`DELETE /users/:name`

##### Response
A response of success or failure of deleting a specific user.

# Update a users information name, email, date_of_birth and password

##### Endpoint

`PUT /users/:name`

email, new password would be sent within the body of the request.

`{"name": "Thomas A. Anderson", "email": "theone@thematrix.org", "date_of_birth": ''######", "password": "*******"}`

##### Response

`{
  "user": {
    "id":   "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Thomas A. Anderson",
    ...
  }
}`
