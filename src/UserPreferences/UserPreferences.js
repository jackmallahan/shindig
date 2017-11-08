import React, { Component } from "react";

class UserPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  fetchUserData = (userId) => {
    fetch(`/api/v1/joint_tables/${userId}`)
      .then(response => response.json())
      .then(response => { return response })
      .then(response => this.checkPreferences(response))
  }

  checkPreferences = (preferences) => {
    const events = document.querySelectorAll('.checkbox')
    preferences.forEach((pref) => {
      let prefId = pref.categoryId
      events.forEach((event) => {
        if(parseInt(event.value) === prefId) {
          event.checked = true
        }
      })
    })
  }

  componentDidMount() {
    this.fetchUserData(this.props.userId)
  }

// save and delete preferences based on checkbox change
  checkBox = (e) => {
    if(e.target.checked === true )  {
      this.props.storePreferences(this.props.userId, e.target.value, e.target.name, e.target.id)
    }
    else if(e.target.checked === false ) {
      this.props.deletePreferences(this.props.userId, e.target.value)
    }
  }


  updatePref = () =>  {
    this.props.exitLogin();
    this.props.updatePrefArray(this.props.userId);
  }

  render() {

    const { exitLogin, userId, updatePrefArray } = this.props;

  return (
    <div className='outer-drop-container'>
      <div className='drop-login-container'>
        <p className='drop-in-title pref-title'>User Preferences</p>
        <div className='preferences-container'>
          <ul className='prefernces-list' onChange={ (e) => this.checkBox(e)}>

            <li className='checkbox-container'>
              <input type='checkbox' id='103' className='checkbox' name='Music' value='3'/>
              <label className='checkbox-label' htmlFor='checkbox1'>Music</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='101' className='checkbox' name='Business & Professional' value='2'/>
              <label className='checkbox-label' htmlFor='checkbox2'>Business</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='110' className='checkbox' name='Food & Drink' value='1'/>
              <label className='checkbox-label' htmlFor='checkbox3'>Food & Drink</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='113' className='checkbox' name='Community & Culture' value='4'/>
              <label className='checkbox-label' htmlFor='checkbox4'>Culture</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='105' className='checkbox' name='Performing & Visual Arts' value='5'/>
              <label className='checkbox-label' htmlFor='checkbox5'>Performing Arts</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='104' className='checkbox' name='Film, Media & Entertainment' value='6'/>
              <label className='checkbox-label' htmlFor='checkbox6'>Film</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='108' className='checkbox' name='Sports & Fitness' value='8'/>
              <label className='checkbox-label' htmlFor='checkbox7'>Sports</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='107' className='checkbox' name='Health & Wellness' value='7'/>
              <label className='checkbox-label' htmlFor='checkbox8'>Wellness</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='102' className='checkbox' name='Science & Technology' value='9'/>
              <label className='checkbox-label' htmlFor='checkbox9'>Science</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='109' className='checkbox' name='Travel & Outdoor' value='10'/>
              <label className='checkbox-label' htmlFor='checkbox10'>Travel</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='111' className='checkbox' name='Charity & Causes' value='12'/>
              <label className='checkbox-label' htmlFor='checkbox11'>Charity</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='114' className='checkbox' name='Religion & Spirituality' value='11'/>
              <label className='checkbox-label' htmlFor='checkbox12'>Religion</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='115' className='checkbox' name='Family & Education' value='13'/>
              <label className='checkbox-label' htmlFor='checkbox13'>Education</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='116' className='checkbox' name='Seasonal & Holiday' value='14'/>
              <label className='checkbox-label' htmlFor='checkbox14'>Holiday</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='112' className='checkbox' name='Government & Politics' value='15'/>
              <label className='checkbox-label' htmlFor='checkbox15'>Politics</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='106' className='checkbox' name='Fashion & Beauty' value='16'/>
              <label className='checkbox-label' htmlFor='checkbox16'>Fashion</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='117' className='checkbox' name='Home & Lifestyle' value='18'/>
              <label className='checkbox-label' htmlFor='checkbox17'>Lifestyle</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='118' className='checkbox' name='Auto, Boat & Air' value='17'/>
              <label className='checkbox-label' htmlFor='checkbox18'>Auto, Boat & Air</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='119' className='checkbox' name='Hobbies & Special Interest' value='19'/>
              <label className='checkbox-label' htmlFor='checkbox19'>Hobbies</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='199' className='checkbox' name='Other' value='20'/>
              <label className='checkbox-label' htmlFor='checkbox20'>Other</label>
            </li>

            <li className='checkbox-container'>
              <input type='checkbox' id='120' className='checkbox' name='School Activities' value='21'/>
              <label className='checkbox-label' htmlFor='checkbox21'>School</label>
            </li>

          </ul>
        </div>
        <button className='nav-btn' onClick={ this.updatePref }>DONE</button>
      </div>
    </div>
  );
}
}

export default UserPreferences;

// <button className='nav-btn' onClick={() => this.selectedEvents() }>Update Preferences</button>
