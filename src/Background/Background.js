import React from 'react';
import introMusic from '../assets/05-Electric-Worm.m4a';
/* eslint-disable no-warning, jsx-a11y/no-static-element-interactions */
/* eslint-disable no-warning, react/self-closing-comp */

const Background = ({ exitLogin }) => (
  <div className="background" onClick={exitLogin}>
    <audio poster={introMusic} autoPlay loop>
      <source src={introMusic}></source>
      <source src={introMusic}></source>
    </audio>
  </div>
);

export default Background;
