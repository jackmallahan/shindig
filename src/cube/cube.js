import React from 'react';
/* eslint-disable no-alert, react/jsx-indent */
/* eslint-disable no-alert, react/self-closing-comp */
/* eslint-disable no-alert,  react/jsx-closing-tag-location */

const Cube = () => {

    return (
      <div className='outer-cube-container'>
        <div className='inner-cube-container'>
          <div className='pole'></div>
          <div className="cube-wrap">
          	<div className="cube">
          		<div className="cube-face front">
                <div className='cube-background border-flicker1'></div>
                <h1 className='flicker1'>S<span className='flicker2'>hi</span>nd<span className='flicker2'>i</span>g</h1>
              </div>
          		<div className="cube-face back">
                <div className='cube-background border-flicker1'></div>
                <h1 className='flicker3'>S<span className='flicker2'>hi</span>nd<span className='flicker1'>i</span>g</h1>
              </div>
          		<div className="cube-face left">
                <div className='cube-background border-flicker2'></div>
                <h1 className='flicker2'>S<span className='flicker1'>hi</span>nd<span className='flicker1'>i</span>g</h1>
              </div>
          		<div className="cube-face right">
                <div className='cube-background border-flicker2'></div>
                <h1 className='flicker1'>S<span className='flicker2'>hi</span>nd<span className='flicker2'>i</span>g</h1>
              </div>
          	</div>
          </div>
        </div>
      </div>
    );
  }

export default Cube;
