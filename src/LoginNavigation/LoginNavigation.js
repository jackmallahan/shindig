import React from 'react';
import introMusic from '../assets/05-Electric-Worm.m4a';

const LoginNavigation = ( { skipLogin, emailLogin, loginWithGoogle, loginWithFacebook } ) => {
    return (
      <div className='backdrop'>
        <div className='outer-button-container'>
          <div className='inner-button-container'>
            <button className='login-btn login-btn1' onClick={ loginWithFacebook }>Login with Facebook</button>
            <button className='login-btn login-btn2' onClick={ loginWithGoogle }>Login with Google</button>
            <button className='login-btn login-btn4' onClick={ skipLogin }>Skip to Shindig</button>
          </div>
        </div>
        <p className='copyright'>Copyright © 2017 1705 Development, Inc.</p>

      </div>
    );
  }

export default LoginNavigation;
