import React from 'react';
import introMusic from '../assets/05-Electric-Worm.m4a';

const Background = ({ exitLogin }) => (
  <div className="background" onClick={exitLogin}>
    <audio poster={introMusic} autoPlay loop>
      <source src={introMusic}>
      <source src={introMusic}>
    </audio>
  </div>
);

export default Background;
