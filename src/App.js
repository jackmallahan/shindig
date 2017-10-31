import React, { Component } from 'react';
import Header from './header/header.js';
import DropNavigation from './DropNavigation/DropNavigation.js';
import Background from './Background/Background.js';
import Cube from './cube/cube.js';
import LoginNavigation from './LoginNavigation/LoginNavigation.js';
import { googleSignIn, facebookSignIn, signOut } from './utils/firebase';
import UserPreferences from './UserPreferences/UserPreferences.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginPageDisplay: true,
      headerDisplay: false,
      navigationDisplay: false,
      EmailLoginDisplay: false,
      userObj: {},
      UserPreferencesDisplay: false
    }
  }

  loginWithGoogle = () => {
    googleSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user
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

  exitLogin = () => {
  this.setState({
    navigationDisplay: false,
    UserPreferencesDisplay: false
    });
  }

  signOut = () => {
    console.log('click');
    signOut();
    this.setState({
      userObj: {},
      loginPageDisplay: true,
      headerDisplay: false
    })
    this.exitLogin();
  }


  render() {

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
          < Header
            displayNavigation = { this.displayNavigation }
          />
        }

        {
          this.state.navigationDisplay &&
          < DropNavigation
            userPreferences = { this.userPreferences }
            signOut = { this.signOut }
          />
        }

        {
          this.state.UserPreferencesDisplay &&
          < UserPreferences
            exitLogin = { this.exitLogin }
          />
        }
      </div>
    );
  }
}


export default App;
