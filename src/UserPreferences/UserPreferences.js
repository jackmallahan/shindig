import React, { Component } from "react";

class UserPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.preferences = []
  }

  selectedEvents = () => {
    this.preferences = []
    const events = document.querySelectorAll('.checkbox')
    events.forEach((event) => {
      if(event.checked === true) {
        let eventId = parseInt(event.value)
        this.preferences.push(eventId)
      }
    })
    this.props.exitLogin()
  }

  render() {
      const { exitLogin } = this.props;

  return (
    <div className='outer-drop-container'>
      <div className='drop-login-container'>
        <p className='drop-in-title'>User Preferences</p>
        <div className='preferences-container'>
          <ul className='prefernces-list'>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox1' className='checkbox' name='Music' value='103'/>
              <label className='checkbox-label' htmlFor='checkbox1'>Music</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox2' className='checkbox' name='Business & Professional' value='101'/>
              <label className='checkbox-label' htmlFor='checkbox2'>Business</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox3' className='checkbox' name='Food & Drink' value='110'/>
              <label className='checkbox-label' htmlFor='checkbox3'>Food & Drink</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox4' className='checkbox' name='Community & Culture' value='113'/>
              <label className='checkbox-label' htmlFor='checkbox4'>Culture</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox5' className='checkbox' name='Performing & Visual Arts' value='105'/>
              <label className='checkbox-label' htmlFor='checkbox5'>Performing Arts</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox6' className='checkbox' name='Film, Media & Entertainment' value='104'/>
              <label className='checkbox-label' htmlFor='checkbox6'>Film</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox7' className='checkbox' name='Sports & Fitness' value='108'/>
              <label className='checkbox-label' htmlFor='checkbox7'>Sports</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox8' className='checkbox' name='Health & Wellness' value='107'/>
              <label className='checkbox-label' htmlFor='checkbox8'>Wellness</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox9' className='checkbox' name='Science & Technology' value='102'/>
              <label className='checkbox-label' htmlFor='checkbox9'>Science</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox10' className='checkbox' name='Travel & Outdoor' value='109'/>
              <label className='checkbox-label' htmlFor='checkbox10'>Travel</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox11' className='checkbox' name='Charity & Causes' value='111'/>
              <label className='checkbox-label' htmlFor='checkbox11'>Charity</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox12' className='checkbox' name='Religion & Spirituality' value='114'/>
              <label className='checkbox-label' htmlFor='checkbox12'>Religion</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox13' className='checkbox' name='Family & Education' value='115'/>
              <label className='checkbox-label' htmlFor='checkbox13'>Education</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox14' className='checkbox' name='Seasonal & Holiday' value='116'/>
              <label className='checkbox-label' htmlFor='checkbox14'>Holiday</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox15' className='checkbox' name='Government & Politics' value='112'/>
              <label className='checkbox-label' htmlFor='checkbox15'>Politics</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox16' className='checkbox' name='Fashion & Beauty' value='106'/>
              <label className='checkbox-label' htmlFor='checkbox16'>Fashion</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox17' className='checkbox' name='Home & Lifestyle' value='117'/>
              <label className='checkbox-label' htmlFor='checkbox17'>Lifestyle</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox18' className='checkbox' name='Auto, Boat & Air' value='118'/>
              <label className='checkbox-label' htmlFor='checkbox18'>Auto, Boat & Air</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox19' className='checkbox' name='Hobbies & Special Interest' value='119'/>
              <label className='checkbox-label' htmlFor='checkbox19'>Hobbies</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox20' className='checkbox' name='Other' value='199'/>
              <label className='checkbox-label' htmlFor='checkbox20'>Other</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='checkbox21' className='checkbox' name='School Activities' value='120'/>
              <label className='checkbox-label' htmlFor='checkbox21'>School</label>
            </li>

          </ul>
        </div>
        <button className='nav-btn' onClick={() => this.selectedEvents() }>Update Preferences</button>
        <button className='nav-btn' onClick={ exitLogin }>Exit</button>
      </div>
    </div>
  );
}
}

export default UserPreferences;
