import React from 'react';

const DisplayPref = ( { userPreferences }) => {

  return (
    <div className='backdrop'>
      <div className='outer-display-pref-container'>
        <div className='drop-display-pref-container'>
          <p className='display-pref-title'>Your Preferences</p>
          <div className='pref-container'>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>

          </div>
          <button className='nav-btn' onClick={ userPreferences } >Update Preferences </button>

        </div>
      </div>
    </div>
  );

}

export default DisplayPref;
