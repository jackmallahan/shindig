import React, { Component } from 'react';
import Header from './header/header.js';
import DropNavigation from './DropNavigation/DropNavigation.js';
import Background from './Background/Background.js';
import Cube from './cube/cube.js';
import LoginNavigation from './LoginNavigation/LoginNavigation.js';
import UserPreferences from './UserPreferences/UserPreferences.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginPageDisplay: true,
      headerDisplay: false,
      navigationDisplay: false,
      UserPreferencesDisplay: false
    }
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
              />
          </div>
        }

        { this.state.headerDisplay &&
          < Header
            displayNavigation = { this.displayNavigation }
          />
        }

        {
          this.state.navigationDisplay &&
          < DropNavigation
            userPreferences = { this.userPreferences }
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
