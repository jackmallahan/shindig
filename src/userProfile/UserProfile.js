import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    const { exitLogin, userInfo } = this.props;

    return (
      <div className='outer-drop-container'>
        <div className='drop-login-container'>
          <p className='drop-in-title user-title'>User Profile</p>
          <div className='avatar-container'>
            <img className='user-avatar' src={userInfo.avatar} alt='user-avatar' />
          </div>
          <p className='user-name'>{userInfo.name ? (`User: ${userInfo.name} `) : 'No User Logged In'}</p>
          <p className='user-name'>{userInfo.email ? (`Email: ${userInfo.email} `) : 'No email'}</p>

          <button className='nav-btn' onClick={exitLogin}>Exit</button>

        </div>
      </div>
    );
  }
}

export default UserProfile;
