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
      userPrefs: [],
      currentLat: null,
      currentLong: null,
      userEvents: []
    };
  }

  storeUser = (displayName, uid, photoURL, email) => {
    const user = Object.assign(
      {},
      {
        name: displayName,
        authID: uid,
        photo: photoURL,
        email: email
      }
    );

    fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .catch(error => console.log({ error }));
  };

  storePreferences = (uid, categoryid, name, categoryNumber) => {
    fetch('/api/v1/joint_tables', {
      method: 'POST',
      body: JSON.stringify({ userId: uid, categoryId: categoryid, prefName: name, categoryNumber: categoryNumber }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .catch(error => console.log({ error }));
  };

  deletePreferences = (uid, categoryid) => {
    fetch(`/api/v1/joint_tables/${uid}/${categoryid}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .catch(error => console.log({ error }));
  };

  loginWithGoogle = () => {
    googleSignIn().then(user => {
      const { id, displayName, uid, photoURL, email } = user.user;

      this.storeUser(displayName, uid, photoURL, email);

      this.fetchUserData(uid);

      this.setState({
        userObj: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true,
        UserPreferencesDisplay: true
      });
    });
  };

  loginWithFacebook = () => {
    facebookSignIn().then(user => {
      const { displayName, uid, photoURL, email } = user.user;

      this.storeUser(displayName, uid, photoURL, email);

      this.fetchUserData(uid);

      this.setState({
        userObj: { name: displayName, id: uid, avatar: photoURL, email: email },
        loginPageDisplay: false,
        headerDisplay: true,
        UserPreferencesDisplay: true
      });
    });
  };

  fetchUserData = userId => {
    fetch(`/api/v1/joint_tables/${userId}`)
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .then(response => this.logEvents(response))
      .catch(error => console.log(error));
  };

  logEvents = userInfo => {
    let prefList = [];
    userInfo.forEach(user => {
      prefList.push(user.categoryNumber);
    });
    this.setState({
      userPrefs: prefList
    });
  };

  skipLogin = () => {
    this.setState({
      loginPageDisplay: false,
      headerDisplay: true
    });
  };

  displayNavigation = () => {
    if (!this.state.navigationDisplay) {
      this.setState({
        navigationDisplay: true
      });
    } else {
      this.setState({
        navigationDisplay: false
      });
    }
  };

  userPreferences = () => {
    this.setState({
      UserPreferencesDisplay: true
    });
  };

  createEvent = () => {
    this.setState({
      createEventDisplay: true
    });
  };

  userProfile = () => {
    this.setState({
      userProfileDisplay: true
    });
  };

  exitLogin = () => {
    this.setState({
      navigationDisplay: false,
      UserPreferencesDisplay: false,
      createEventDisplay: false,
      userProfileDisplay: false
    });
  };

  login = () => {
    this.setState({
      loginPageDisplay: true,
      headerDisplay: false,
      navigationDisplay: false,
      EmailLoginDisplay: false,
      UserPreferencesDisplay: false,
      createEventDisplay: false,
      userProfileDisplay: false
    });
  };

  signOut = () => {
    signOut();
    this.setState({
      userObj: {},
      loginPageDisplay: true,
      headerDisplay: false
    });
    this.exitLogin();
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude
      });
    });
  };

  fetchEvents = (locationWithin, lat, long) => {
    fetch(
      `https://www.eventbriteapi.com/v3/events/search/?sort_by=distance&location.within=${locationWithin}&location.latitude=${lat}&location.longitude=${long}&start_date.keyword=today&token=FSMFIMMKBZMU5HR6LYN2`
    )
      .then(data => data.json())
      .then(data => this.setState({ userEvents: data.events }));
  };

  componentDidMount() {
    this.getLocation();
    if (this.state.currentLat) {
      this.fetchEvents('1mi', this.state.currentLat, this.state.currentLong);
    } else {
      setTimeout(() => {
        this.fetchEvents('1mi', this.state.currentLat, this.state.currentLong);
      }, 7000);
    }
  }

  render() {
    return (
      <div className="App">
        <Background exitLogin={this.exitLogin} />

        {this.state.loginPageDisplay && (
          <div>
            <Cube />
            <LoginNavigation
              skipLogin={this.skipLogin}
              loginWithGoogle={this.loginWithGoogle}
              loginWithFacebook={this.loginWithFacebook}
            />
          </div>
        )}

        {this.state.headerDisplay && (
          <div>
            <Header displayNavigation={this.displayNavigation} />
            <Map
              currentLat={this.state.currentLat}
              currentLong={this.state.currentLong}
              userEvents={this.state.userEvents}
              userAuthId={this.state.userObj.id}
              userPrefs={this.state.userPrefs}
            />
          </div>
        )}

        {this.state.navigationDisplay && (
          <DropNavigation
            userPreferences={this.userPreferences}
            createEvent={this.createEvent}
            userProfile={this.userProfile}
            login={this.login}
            signOut={this.signOut}
            userInfo={this.state.userObj}
          />
        )}

        {this.state.UserPreferencesDisplay && (
          <UserPreferences
            exitLogin={this.exitLogin}
            storePreferences={this.storePreferences}
            deletePreferences={this.deletePreferences}
            userId={this.state.userObj.id}
            updatePrefArray={this.fetchUserData}
          />
        )}

        {this.state.createEventDisplay && <CreateEvent exitLogin={this.exitLogin} />}

        {this.state.userProfileDisplay && <UserProfile exitLogin={this.exitLogin} userInfo={this.state.userObj} />}
      </div>
    );
  }
}

export default App;
