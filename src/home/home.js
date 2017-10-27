import React from 'react';
import Cube from '../cube/cube.js';


const Home = () => {

    return (
      <div className='home-outer-container'>
        < Cube />
        <div className='outer-button-container'>
          <div className='inner-button-container'>
            <button className='login-btn login-btn1'>Login with Facebook</button>
            <button className='login-btn login-btn2'>Login with Google</button>
            <button className='login-btn login-btn3'>Login with Email</button>
            <button className='login-btn login-btn4'>Create an Account</button>
          </div>
        </div>
      </div>
    );
  }

export default Home;
