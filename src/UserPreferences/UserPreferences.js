import React from 'react';

const UserPreferences = ( {exitLogin} ) => {

  return (
    <div className='outer-drop-container'>
      <div className='drop-login-container'>
        <p className='drop-in-title'>User Preferences</p>
        <div className='preferences-container'>
          <ul className='prefernces-list'>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Music' />
              <label htmlFor='Music'>
                <p className='checkbox-label'>Music</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Business & Professional' />
              <label htmlFor='Business & Professional'>
                <p className='checkbox-label'>Business & Professional</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Food & Drink' />
              <label htmlFor='Food & Drink'>
                <p className='checkbox-label'>Food & Drink</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Community & Culture' />
              <label htmlFor='Community & Culture'>
                <p className='checkbox-label'>Community & Culture</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Performing & Visual Arts' />
              <label htmlFor='Performing & Visual Arts'>
                <p className='checkbox-label'>Performing & Visual Arts</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Film, Media & Entertainment' />
              <label htmlFor='Film, Media & Entertainment'>
                <p className='checkbox-label'>Film, Media & Entertainment</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Sports & Fitness' />
              <label htmlFor='Sports & Fitness'>
                <p className='checkbox-label'>Sports & Fitness</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Health & Wellness' />
              <label htmlFor='Health & Wellness'>
                <p className='checkbox-label'>Health & Wellness</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Science & Technology' />
              <label htmlFor='Science & Technology'>
                <p className='checkbox-label'>Science & Technology</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Travel & Outdoor' />
              <label htmlFor='Travel & Outdoor'>
                <p className='checkbox-label'>Travel & Outdoor</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Charity & Causes' />
              <label htmlFor='Charity & Causes'>
                <p className='checkbox-label'>Charity & Causes</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Religion & Spirituality' />
              <label htmlFor='Religion & Spirituality'>
                <p className='checkbox-label'>Religion & Spirituality</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Family & Education' />
              <label htmlFor='Family & Education'>
                <p className='checkbox-label'>Family & Education</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Seasonal & Holiday' />
              <label htmlFor='Seasonal & Holiday'>
                <p className='checkbox-label'>Seasonal & Holiday</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Government & Politics' />
              <label htmlFor='Government & Politics'>
                <p className='checkbox-label'>Government & Politics</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Fashion & Beauty' />
              <label htmlFor='Fashion & Beauty'>
                <p className='checkbox-label'>Fashion & Beauty</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Home & Lifestyle' />
              <label htmlFor='Home & Lifestyle'>
                <p className='checkbox-label'>Home & Lifestyle</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Auto, Boat & Air' />
              <label htmlFor='Auto, Boat & Air'>
                <p className='checkbox-label'>Auto, Boat & Air</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Hobbies & Special Interest' />
              <label htmlFor='Hobbies & Special Interest'>
                <p className='checkbox-label'>Hobbies & Special Interest</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='Other' />
              <label htmlFor='Other'>
                <p className='checkbox-label'>Other</p>
              </label>
            </li>
            <li className='checkbox-container'>
              <input type='checkbox' className='checkbox' name='School Activities' />
              <label htmlFor='School Activities'>
                <p className='checkbox-label'>School Activities</p>
              </label>
            </li>
          </ul>
        </div>
        <button className='nav-btn'>Update Preferences</button>
        <button className='nav-btn' onClick={ exitLogin }>Exit</button>
      </div>
    </div>
  );

}

export default UserPreferences;
