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
import fetchEvents from './helpers/fetchEvents';
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


  storePreferences = (uid, categoryid) => {
    fetch('/api/v1/joint_tables', {
      method: 'POST',
      body: JSON.stringify({ userId: uid, categoryId: categoryid }),
      headers: {
        'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .then(response => { return response } )
    .catch(error => console.log({ error }));
  }

  myPreferences = (uid, preferencesId) => {
    preferencesId.forEach(id => {
      this.storePreferences(uid, id)
    })
   }


  loginWithGoogle = () => {
    googleSignIn().then(user => {
      const { id, displayName, uid, photoURL, email } = user.user


      this.storeUser(displayName, uid, photoURL, email);

      this.setState({
        userObj: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true,
        UserPreferencesDisplay: true
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
        headerDisplay: true,
        UserPreferencesDisplay: true
      }
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
    navigationDisplay: false,
    UserPreferencesDisplay: true
    });
  }

  createEvent = () => {
  this.setState({
    navigationDisplay: false,
    createEventDisplay: true
    });
  }

  userProfile = () => {
  this.setState({
    navigationDisplay: false,
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
    console.log('CDM');
    fetchEvents('10mi', 39.7508, 104.9966)
    this.getLocation();
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
            userPreferences={ this.myPreferences }
            userId = { this.state.userObj.id }
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
