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

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 4494
ETag: W/"118e-iiEHHkYUwKP9ca98bzVhg0hcmu8"
Date: Fri, 29 Mar 2019 07:04:28 GMT
Connection: keep-alive

## Get movie by name

`GET /movies/:moviename`

### Response


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

You have requested the directors

## Get a director by name

## Request

`GET /directors/:name`

### Response

You have requested the director: :name

## Get Genres

## Request

`GET /genres/`

### Response

## Get a director by name

## Request

`GET /directors/:name`

### Response

## Get Genres

## Request

`GET /genres/`

### Response

You have requested genres

## Get Genres by name

## Request

`GET /genres/:genres`

### Response

You have requested the genre: :genres

You have requested the genre: Thriller

## Get users registration

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

You have requested: Silent Bob's favorites

## Create a new user

### Request

`POST /user`

### Response

{
    "id": "db3b23a6-23a8-47c2-aaec-5d4649286bdf",
    "name": "Silent Bobs Friend Jay",
    "email": "funnyman2@comicbooks.org",
    "dateOfBirth": "05/16/1985",
    "favoriteMovies": "Jay and Silent Bob Strike back"
}

##

### Request

`DELETE /users/:name`



### Response
