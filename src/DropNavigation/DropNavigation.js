import React from 'react';

const DropNavigation = ( {  userPreferences, createEvent, userProfile, signOut, login, userInfo }) => {

  return (
    <div className='outer-drop-nav-container'>
      <div className='drop-nav-container'>
        <button className='nav-btn' onClick={ userProfile }>User Profile</button>
        <button className='nav-btn' onClick={ userPreferences }>User Preferences</button>
        <button className='nav-btn' onClick={ createEvent }>Create an Event</button>
        { !userInfo.name && <button className='nav-btn' onClick={ login }>Login</button>}
        { userInfo.name && <button className='nav-btn' onClick={ signOut }>Logout</button>}
      </div>
    </div>
  );

}

export default DropNavigation;
