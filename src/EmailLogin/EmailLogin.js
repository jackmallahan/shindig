import React from 'react';

const EmailLogin = ( {exitLogin} ) => {

  return (
    <div className='outer-drop-container'>
      <div className='drop-login-container'>
        <p className='sign-in-title'>Email Login</p>
        <input className='login-input email' placeholder='   Enter Email'/>
        <input className='login-input password' placeholder='   Enter Password'/>
        <button className='nav-btn'>Login</button>
        <button className='nav-btn' onClick={ exitLogin }>Exit</button>
      </div>
    </div>
  );

}

export default EmailLogin;
