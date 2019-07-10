/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions.js';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './main-view.scss';


export class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };


  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem('user'))
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }


  onLoggedIn(authData) {
    const config = {
      Username: authData.user.Username,
      Email: authData.user.Email,
      Birthday: authData.user.Birthday,
      FavoriteMovies: authData.user.FavoriteMovies
    }

    this.setState({
      user: config
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(config));
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");

    this.setState({
      user: null
    });
  }




  render() {
    const { user } = this.state;
    if (!user) {
      return (
        <Router>
          <Container className='main-view'>
            <Row>
              <Route exact path='/' render={() => { return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; }} />
              <Route path='/register' render={() => <RegistrationView />} />
              <Route path='/profile' render={() => <Redirect to='/' />} />
            </Row>
          </Container>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar sticky='top' bg='dark' variant='dark'>

            <h1 className="navbar-brand mx-auto">MyFlix</h1>
            <Nav className='nav-bar'>

              <Link className='nav-link' to='/'>Home</Link>
              <Link className='nav-link' to='/profile'>Profile</Link>
              <Link className='nav-link' onClick={() => this.onLogOut()} to='/'>Logout</Link>

            </Nav>
          </Navbar>
          <Container className='main-view' fluid='true'>
            <Row>
              <Route exact path='/' render={() => <MoviesList />} />
              <Route path='/profile' render={() => <ProfileView user={this.state.user} onLoggedIn={this.onLoggedIn} />} />
              <Route path='/movies/:Id' render={({ match }) => <Col><MovieView user={this.state.user} /></Col>} />
              <Route path='/genre/:Genre' render={({ match }) => <GenreView genre={match.params.Genre} />} />
              <Route path='/director/:Director' render={({ match }) => <DirectorView directorName={match.params.Director} />} />
            </Row>
          </Container>
        </Router>
      );
    }
  }
}
export default connect(null, { setMovies })(MainView);



// /* eslint-disable no-unused-vars */

// import React from "react";
// import axios from "axios";

// import { connect } from "react-redux";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import { setMovies } from "../../actions/actions";

// import MoviesList from "../movies-list/movies-list";

// import { Row } from "react-bootstrap";
// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import MovieView from "../movie-view/movie-view";
// import { RegistrationView } from "../registration-view/registration-view";
// import { DirectorView } from "../director-view/director-view";
// import { GenreView } from "../genre-view/genre-view";
// import { ProfileView } from "../profile-view/profile-view";

// import "./main-view.scss";

// class MainView extends React.Component {
//   constructor() {
//     super();

//     this.goBack = this.goBack.bind(this);

//     this.state = {
//       movies: [],
//       selectedMovieId: null,
//       user: null,
//       newUser: false
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user")
//       });
//       this.getMovies(accessToken);
//     }
//   }
//   goBack() {
//     this.props.history.goBack();
//   }

//   onMovieClick(movie) {
//     window.location.hash = "#" + movie._id;
//     this.setState({
//       selectedMovieId: movie
//     });
//   }

//   onLoggedIn(authData) {
//     this.setState({
//       user: authData.user.Username
//     });

//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.Username);
//     localStorage.setItem("userInfo", JSON.stringify(authData.user));
//     this.getMovies(authData.token);
//   }

//   onLogOut() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userInfo");

//     this.setState({
//       user: null
//     });
//   }

//   getMovies(token) {
//     axios
//       .get("https://myflixapi.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         this.props.setMovies(response.data);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

//   goMainView() {
//     this.setState({
//       selectedMovieId: null
//     });
//   }

//   toggleNewUserState() {
//     this.setState(state => ({
//       newUser: !state.newUser
//     }));
//   }

//   render() {
//     const { movies, user, newUser } = this.state;

//     if (!user && !newUser) {
//       return (
//         <LoginView
//           onLoggedIn={user => this.onLoggedIn(user)}
//           onNewHereLinkClicked={() => this.toggleNewUserState()}
//         />

//       );
//     }


//     if (!user && newUser) {
//       return (
//         <RegistrationView
//           onAlreadyAUserLinkClicked={() => this.toggleNewUserState()}
//           onUserRegistered={user => this.onLoggedIn(user)}
//         />
//       );
//     }

//     if (!movies || !movies.length) return <div className="main-view" />;

//     return (
//       <Router>
//         <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//           <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
//             <ul className="navbar-nav mr-auto">
//               <li className="nav-item active">
//                 <Link to={"/RegistrationView"} className="nav-link">
//                   Welcome Back, {user}!
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/profile"} className="font-weight-bold nav-link">
//                   User Settings
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="mx-auto order-0">
//             <h1 className="navbar-brand mx-auto">MyFlix</h1>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target=".dual-collapse2"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//           </div>
//           <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/"} className="font-weight-bold nav-link">
//                   Back
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to={"/"}
//                   className="font-weight-bold nav-link "
//                   onClick={() => this.onLogOut()}
//                 >
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <div className="main-view">
//           <Route path="/profile" render={() => <ProfileView />} />



//           <Route exact path="/" render={() => {
//             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//             return <MoviesList />;
//           }}
//           />

//           <Route
//             exact
//             path="/movies/:movieID"
//             render={({ match }) => (
//               <MovieView
//                 movie={movies.find(m => m._id === match.params.movieID)}
//                 logout={() => this.onLogOut()}
//               />
//             )}
//           />

//           <Route path="/register" render={() => <RegistrationView />} />

//           <Route
//             path="/director/:name"
//             render={({ match }) => {
//               if (!movies || !movies.length)
//                 return <MainView />;
//               return (
//                 <DirectorView
//                   director={
//                     movies.find(
//                       movie => movie.Director.Name === match.params.name
//                     ).Director
//                   }
//                   logout={() => this.onLogOut()}
//                 />
//               );
//             }}
//           />

//           <Route
//             exact
//             path="/genres/:name"
//             render={({ match }) => {
//               if (!movies || !movies.length)
//                 return <div className="main-view" />;
//               return (
//                 <GenreView
//                   genre={
//                     movies.find(movie => movie.Genre.Name === match.params.name)
//                       .Genre
//                   }
//                   logout={() => this.onLogOut()}
//                 />
//               );
//             }}
//           />
//         </div>
//       </Router>
//     );
//   }
// }
// export default connect(
//   null,
//   { setMovies }
// )(MainView);
