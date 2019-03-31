# REST API myFlix

To build the server­side component of a “movies” web application. The web application will
provide users with access to information about different movies, directors, and genres. Users
will be able to sign up, update their personal information, and create a list of their favorite
movies.


## Get list of Movies

### Request

`GET /movies/`

    curl -i http://localhost:3000/movies

### Response

The response will be a list of JSON objects. Each will represent a movie.

## Get movie by name

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

### Request

`GET /directors/`

### Response

A JSON object containing a list of directors including name, bio, year of birth, year of death.

## Get a director by name

## Request

`GET /directors/:name`

## Get Genres

## Request

`GET /genreNames/`

### Response

Response is a list of JSON objects displaying the different movie genres.

{"Genre": "Action, Adventure, Sci-Fi"};


## Get Genres by name

## Request

`GET /genres/:genresName`

### Response

This will return a JSON object of a specific movie genre by name and description.

You have requested the genre: Thriller

## Get users registration information.

## Request

`GET /users/`

### Response

You have requested the User Registration Page

## Get user by name

## Request

`GET /users/:name`

### Response

You have requested the profile: Larry

## Get users favorites by name

## Request

`GET /users/:name/favorites`

### Response
A JSON object of a specific users favorite movies.

You have requested: Silent Bob's favorites

## Update users favorites.

## Request

`POST /users/:name/favorites/[movie_name(s)]`

### Response
A JSON object of a specific movie to add to a users-favorites table.
A success or failure will also be returned.

## Delete a movie from a users favorites.

## Request

`DELETE /users/:name/favorites/[movie_name(s)]`

### Response
A JSON object of a specific movie to remove from a users-favorites table.

A success or failure will also be returned.

## Create a new user

### Request

`POST /users`

### Response

A JSON object containing id, name, email, date of birth and favorite movies. The information is to be added to the message body of the HTTP request. A success or failure will also be returned. ex. If password does not meet complexity requirements or email is not in a valid format a failure will result. If the user already exists a failure will result. If all the required information and in the correct format as follows a success message will be returned.

``{
    "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Silent Bobs Friend Jay",
    "email": "funnyman2@comicbooks.org",
    "dateOfBirth": "05/16/1985",
    "favoriteMovies": "Jay and Silent Bob Strike back"
``}

## Allow a user to de-register.

### Request

`DELETE /users/:name`

### Response
A response of success or failure of deleting a specific user. Requires registered users :name.

## update a user password/email/dateOfBirth

### Request

`PUT /users/:name/:password/:email/:dateOfBirth`

### Response

A JSON object in the HTTP request body containing the the users :name and property to update ex. :email.

{"name": "Steve", "email": "newemail@stevesplace.io"}

A success or failure will also be returned.
