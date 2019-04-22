# **REST API myFlix**

To build the server­ side component of a “movies” web application. The web application will
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

The response will be a list of JSON objects. Each will represent a movie.

`[
  {
      "id": "1",
      "title": "Game Night",
      "description": ""A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
      "genre": "Comedy",
      "director": "John Francis Daley",
      "imagepath": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
      "featured": true
  }
]`

# Get movie by name

##### Endpoint

`GET /movies/:moviename`

##### Response

The response will be a JSON object of a specifc movie. It will contain id, title, description, genre, director, imagepath and featured.

`{
      "id": "1",
      "title": "Game Night",
      "description": ""A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
      "genre": "Comedy",
      "director": "John Francis Daley",
      "imagepath": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
      "featured": true
}`

# Get a director by name

##### Endpoint

`GET /movies/directors/:name`

##### response

JSON list of objects by a specific director by name including bio, date of birth and date of death.

`[
  {
    "Genre": {
        "Name": "Comedy",
        "Description": "Comedy is a genre of film in which the main emphasis is on humour. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
    },
    "Director": {
        "Name": "Tim Miller",
        "Bio": "Tim Miller is an American animator, film director, creative director and visual effects artist. He was nominated for the Academy Award for Best Animated Short Film for the work on his short animated film Gopher Broke. He made his directing debut with Deadpool.",
        "Birth": "1970",
        "Death": "N/A"
    },
    "Actors": [],
    "_id": "5cad021217248cdd9b9d51bf",
    "Title": "Deadpool",
    "Description": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
    "ImagePath": "deadpool.png",
    "Featured": true
  }
]`


# Get Genre by name

##### Endpoint

`GET /movies/genres/:genreName`

##### Response

Response is a list of JSON objects displaying the different movies by genre.

`[
  {
    "Genre": {
        "Name": "Thriller",
        "Description": "Thriller film, also known as suspense film of suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
    },
    "Director": {
        "Name": "Jonathan Demme",
        "Bio": "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        "Birth": "1944",
        "Death": "2017"
    },
    "Actors": [
        "Kasi Lemmings"
    ],
    "_id": "5cac3643ac119bc385bb590c",
    "Title": "Silence of the Lambs",
    "Description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
    "ImagePath": "silenceofthelambs.png",
    "Featured": true
  }
]`

# Get a list of user information.

##### Endpoint

`GET /users/`

##### Response

A list of JSON objects would be returned.

`[
    {
        "FavoriteMovies": [
            "5cad017d17248cdd9b9d51ba"
        ],
        "_id": "5cad03b817248cdd9b9d51c2",
        "Username": "jdoe",
        "Password": "IamaBadPassword",
        "Email": "jdoe@unknown.com",
        "Birthday": "1985-02-19T00:00:00.000Z"
    }
]`

# Get user by name

##### Endpoint

`GET /users/:Username`

##### Response
`{
    "FavoriteMovies": [
        "5cad017d17248cdd9b9d51ba"
    ],
    "_id": "5cad03b817248cdd9b9d51c2",
    "Username": "jdoe",
    "Password": "IamaBadPassword",
    "Email": "jdoe@unknown.com",
    "Birthday": "1985-02-19T00:00:00.000Z"
}`

# Get users favorites by name

##### Endpoint

`GET /users/:Username/Movies`

##### Response

A JSON object of a specific users favorite movies.

`{
    "FavoriteMovies": [
        "5cad017d17248cdd9b9d51ba"
    ],
    "_id": "5cad03b817248cdd9b9d51c2",
    "Username": "jdoe"
}`

# Add favorite movie for a user.

##### Endpoint

`POST /users/:Username/Movies/:MovieID`

##### Response

`{
    "FavoriteMovies": [
        "5cad022517248cdd9b9d51c0",
        "5cad017d17248cdd9b9d51ba"
    ],
    "_id": "5cad05ad17248cdd9b9d51c6",
    "Username": "rjohnson",
    "Password": "@!9Mhj30101",
    "Email": "randy@someemail.com",
    "Birthday": "1978-05-12T00:00:00.000Z"
}`

# Delete a movie from a users favorites.

##### Endpoint

`DELETE /users/:Username/Movies/:MovieID`

##### Response

`{
    "FavoriteMovies": [
        "5cad023417248cdd9b9d51c1",
        "5cad021217248cdd9b9d51bf",
        "5cad017d17248cdd9b9d51ba"
    ],
    "_id": "5cad049717248cdd9b9d51c3",
    "Username": "bsmith",
    "Password": "passW0rd",
    "Email": "bsmith@noemail.com",
    "Birthday": "1975-05-10T00:00:00.000Z"
}`

# User sign up

##### Endpoint

`POST /users`

##### Request

A JSON object containing id, name, email and birthday. The information is to be added to the message body of the HTTP request. A success or failure will also be returned.

`{
	"Username" : "TestUser99",
	"Password" : "Imapassword",
	"Email" : "tu99@gmail.com",
	"Birthday": "1985-02-19"
}`
	

##### Response

A success or failure will also be returned.

# Allow a user to de-register.

##### Endpoint

`DELETE /users/:Username`

##### Response
A response of success or failure of deleting a specific user.

# Update a users information Name, Email, Birthday and Password

##### Endpoint

`PUT /users/:Username`

##### Request

email, new password would be sent within the body of the request.

`{
	"Username" : "TestUser99",
	"Password" : "StillBadPassword",
	"Email" : "tu99Updated@gmail.com",
  "Birthday" : "1985-19-2"
}`

##### Response

`{
    "n": 1,
    "nModified": 1,
    "ok": 1
}`
