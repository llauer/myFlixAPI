# **REST API myFlix**

To build the server­ side component of a “movies” web application. The web application will
provide users with access to information about different movies, directors, and genres. Users
will be able to sign up, update their personal information, and create a list of their favorite
movies.

# Get list of Movies

##### Endpoint

`GET /movies/`

##### Response

The response will be a list of JSON objects. Each will represent a movie.

`[
  {
    "Genre": {
        "Name": "Comedy",
        "Description": "Comedy is a genre of film in which the main emphasis is on humour. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
    },
    "Director": {
        "Name": "Guy Ritchie",
        "Bio": "Guy Ritchie was born in Hatfield, Hertfordshire, UK on September 10, 1968. After watching Butch Cassidy and the Sundance Kid (1969) as a child, Guy realized that what he wanted to do was make films. He never attended film school, saying that the work of film school graduates was boring and unwatchable.",
        "Birth": "1968",
        "Death": "N/A"
    },
    "Actors": [],
    "_id": "5cad023417248cdd9b9d51c1",
    "Title": "Snatch",
    "Description": "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
    "ImagePath": "snatch.png",
    "Featured": true
  }
]`

# Get movie by name

##### Endpoint

`GET /movies/:title`

##### Response

The response will be a JSON object of a specifc movie. It will contain id, title, description, genre, director, imagepath and featured.

`{
    "Genre": {
        "Name": "Action",
        "Description": "Action film is a film genre in which the protagonist or protagonists are thrust into a series of challenges that typically include violence, extended fighting, physical feats, and frantic chases."
    },
    "Director": {
        "Name": "Michael Bay",
        "Bio": "A graduate of Wesleyan University, Michael Bay spent his 20s working on advertisements and music videos. His first projects after film school were in the music video business. He created music videos for Tina Turner, Meat Loaf, Lionel Richie, Wilson Phillips, Donny Osmond and Divinyls.",
        "Birth": "1965",
        "Death": "N/A"
    },
    "Actors": [],
    "_id": "5cad01ed17248cdd9b9d51bd",
    "Title": "Transformers",
    "Description": "An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.",
    "ImagePath": "transformers.png",
    "Featured": true
}`

# Get a director by name

##### Endpoint

`GET /directors/:name`

##### response

JSON list of objects by a specific director by name including bio, date of birth and date of death.

`[
    {
        "Director": {
            "Name": "Tim Miller",
            "Bio": "Tim Miller is an American animator, film director, creative director and visual effects artist. He was nominated for the Academy Award for Best Animated Short Film for the work on his short animated film Gopher Broke. He made his directing debut with Deadpool.",
            "Birth": "1970",
            "Death": "N/A"
        },
        "_id": "5cad021217248cdd9b9d51bf"
    }
]`

# Get Genre by name

##### Endpoint

`GET /genres/:genreName`

##### Response

Response is a JSON object displaying information about a genre.

`[
    {
        "Genre": {
            "Name": "Thriller",
            "Description": "Thriller film, also known as suspense film of suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
        },
        "_id": "5cac3643ac119bc385bb590c"
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
    "FavoriteMovies": [],
    "_id": "5cbe390607388c053ad7994c",
    "Username": "TestUser99",
    "Password": "StillBadPassword",
    "Email": "tu99Updated@gmail.com",
    "Birthday": "1998-02-07T07:00:00.000Z",
    "__v": 0
}`

##### Response

`{
    "FavoriteMovies": [],
    "_id": "5cbe390607388c053ad7994c",
    "Username": "TestUser99",
    "Password": "StillBadPassword",
    "Email": "tu99Updated@gmail.com",
    "Birthday": "1998-02-07T07:00:00.000Z",
    "__v": 0
}`
