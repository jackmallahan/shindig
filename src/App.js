import React, { Component } from 'react';
import Header from './header/header.js';
import DropNavigation from './DropNavigation/DropNavigation.js';
import Background from './Background/Background.js';
import Cube from './cube/cube.js';
import LoginNavigation from './LoginNavigation/LoginNavigation.js';
import { googleSignIn, facebookSignIn, signOut } from './utils/firebase';
import UserPreferences from './UserPreferences/UserPreferences.js';
import CreateEvent from './CreateEvent/CreateEvent.js';
import UserProfile from './userProfile/UserProfile.js';
import Map from './GoogleMap/GoogleMap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginPageDisplay: true,
      headerDisplay: false,
      navigationDisplay: false,
      EmailLoginDisplay: false,
      UserPreferencesDisplay: false,
      createEventDisplay: false,
      userProfileDisplay: false,
      userObj: {},
      currentLat: null,
      currentLong: null
    }
  }

  storeUser = (displayName, uid, photoURL, email) => {
    const user = Object.assign({}, {
      name: displayName,
      authID: uid,
      user_id: null,
      photo: photoURL,
      email: email
    })

    fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => { return response } )
    .catch(error => console.log({ error }));
  }


  loginWithGoogle = () => {
    googleSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user

      this.storeUser(displayName, uid, photoURL, email);

      this.setState({
        userObj: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true
      })
    })
  }


  loginWithFacebook = () => {
    facebookSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user

      this.storeUser(displayName, uid, photoURL, email);

      this.setState({
        userObj: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true}
      )
    })
  }

  skipLogin = () => {
    this.setState({
      loginPageDisplay: false,
      headerDisplay: true
      });
    }

  displayNavigation = () => {
    if(this.state.navigationDisplay === false ) {
      this.setState({
        navigationDisplay: true
        });
    } else {
      this.setState({
        navigationDisplay: false
      });
    }
  }

  userPreferences = () => {
  this.setState({
    UserPreferencesDisplay: true
    });
  }

  createEvent = () => {
  this.setState({
    createEventDisplay: true
    });
  }

  userProfile = () => {
  this.setState({
    userProfileDisplay: true
    });
  }

  exitLogin = () => {
  this.setState({
    navigationDisplay: false,
    UserPreferencesDisplay: false,
    createEventDisplay: false,
    userProfileDisplay: false
    });
  }

  login = () => {
  this.setState({
    loginPageDisplay: true,
    headerDisplay: false,
    navigationDisplay: false,
    EmailLoginDisplay: false,
    UserPreferencesDisplay: false,
    createEventDisplay: false,
    userProfileDisplay: false,
    });
  }

  signOut = () => {
    signOut();
    this.setState({
      userObj: {},
      loginPageDisplay: true,
      headerDisplay: false
    })
    this.exitLogin();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude
      });
    });
  }

  componentDidMount() {
    this.getLocation();
    console.log(this.state.currentLocation);
  }

  render() {
    console.log('currentLocation', this.state.currentLocation);
    return (
      <div className="App">

        < Background
          exitLogin = { this.exitLogin }
        />

        {
          this.state.loginPageDisplay &&
          <div>
            < Cube />
            <LoginNavigation
              skipLogin = { this.skipLogin }
              loginWithGoogle = { this.loginWithGoogle }
              loginWithFacebook = { this.loginWithFacebook }
              />
          </div>
        }

        {
          this.state.headerDisplay &&
          <div>
            < Header
              displayNavigation = { this.displayNavigation }
            />
            < Map currentLat = { this.state.currentLat } currentLong = { this.state.currentLong } />
          </div>
        }

        {
          this.state.navigationDisplay &&
          < DropNavigation
            userPreferences = { this.userPreferences }
            createEvent = { this.createEvent }
            userProfile = { this.userProfile }
            login = { this.login }
            signOut = { this.signOut }
            userInfo = { this.state.userObj }
          />
        }

        {
          this.state.UserPreferencesDisplay &&
          < UserPreferences
            exitLogin = { this.exitLogin }
          />
        }

        {
          this.state.createEventDisplay &&
          < CreateEvent
            exitLogin = { this.exitLogin }
          />
        }

        {
          this.state.userProfileDisplay &&
          < UserProfile
            exitLogin = { this.exitLogin }
            userInfo = { this.state.userObj }
          />
        }

      </div>
    );
  }
}


export default App;
