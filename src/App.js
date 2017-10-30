import React, { Component } from 'react';
import Header from './header/header.js';
import DropNavigation from './DropNavigation/DropNavigation.js';
import Background from './Background/Background.js';
import Cube from './cube/cube.js';
import LoginNavigation from './LoginNavigation/LoginNavigation.js';
import EmailLogin from './EmailLogin/EmailLogin.js';
import { googleSignIn } from './utils/firebase';
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

  skipLogin() {
  this.setState({
    loginPageDisplay: false,
    headerDisplay: true
    });
  }

  displayNavigation() {
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

  emailLogin() {
  this.setState({
    EmailLoginDisplay: true
    });
  }

  exitLogin() {
  this.setState({
    EmailLoginDisplay: false
    });
  }


  render() {

    return (
      <div className="App">
        < Background />
        {this.state.loginPageDisplay ? < Cube /> : '' }
        {this.state.loginPageDisplay ? < LoginNavigation
          skipLogin = { this.skipLogin.bind(this) }
          emailLogin = { this.emailLogin.bind(this) }
          loginWithGoogle = { this.loginWithGoogle.bind(this) }
          /> : '' }
        {this.state.headerDisplay ? < Header
          displayNavigation = { this.displayNavigation.bind(this) }
          /> : '' }
        {this.state.navigationDisplay ? < DropNavigation /> : '' }
        {this.state.EmailLoginDisplay ? < EmailLogin
          exitLogin = { this.exitLogin.bind(this) }
          /> : '' }
      </div>
    );
  }
}


export default App;
