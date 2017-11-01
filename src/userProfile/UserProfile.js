import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {

    }
  }



  render() {

    const { exitLogin } = this.props;

    return (
      <div className='outer-drop-container'>
        <div className='drop-login-container'>
          <p className='drop-in-title'>User Profile</p>




          <button className='nav-btn' onClick={ exitLogin }>Exit</button>

        </div>
      </div>
    );
  }
}

export default UserProfile;
