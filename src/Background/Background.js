import React from 'react';
import introMusic from '../assets/05-Electric-Worm.m4a';

const Background = ( { exitLogin }) => {

    return (
      <div className='background' onClick={ exitLogin }>
        <audio poster={introMusic} autoPlay loop >
          <source src={introMusic} ></source>
          <source src={introMusic} ></source>
        </audio>
      </div>
    );
  }

export default Background;
