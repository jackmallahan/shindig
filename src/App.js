import React, { Component } from 'react';
import Header from './header/header.js';
import DropNavigation from './DropNavigation/DropNavigation.js';
import Background from './Background/Background.js';
import Cube from './cube/cube.js';
import LoginNavigation from './LoginNavigation/LoginNavigation.js';
import { googleSignIn, facebookSignIn } from './utils/firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginPageDisplay: true,
      headerDisplay: false,
      navigationDisplay: false,
      EmailLoginDisplay: false,
      loggedIn: {}
    }
  }

  loginWithGoogle() {
    googleSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user
      this.setState({
        loggedIn: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true}
      )
    })
  }

  loginWithFacebook() {
    facebookSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user
      this.setState({
        loggedIn: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true}
      )
    })
  }

  skipLogin() {
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

  exitMenu = () => {
  this.setState({

    });
  }


  render() {

    return (
      <div className="App">
        < Background />
        {
          this.state.loginPageDisplay &&
          <div>
            < Cube />
            <LoginNavigation
              skipLogin = { this.skipLogin }
              loginWithGoogle = { this.loginWithGoogle.bind(this) }
              loginWithFacebook = { this.loginWithFacebook.bind(this) }
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
          < DropNavigation />
        }
      </div>
    );
  }
}


export default App;
