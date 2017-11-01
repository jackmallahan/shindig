import React, { Component } from 'react';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      invalidEvent: false
    }

  }

  eventInfo = () => {
    const name = document.getElementById('event-name').value;
    const location = document.getElementById('event-location').value;
    const date = document.getElementById('event-date').value;
    const cost = document.getElementById('event-cost').value;
    if( name.length && location.length && date.length && cost.length >= 1) {
      this.props.exitLogin()
    } else {
      this.setState({ invalidEvent: true });
    }
  }

  render() {

    const { exitLogin } = this.props;

    return (
      <div className='outer-drop-container'>
        <div className='drop-login-container'>
          <p className='drop-in-title'>Create Event</p>

          { this.state.invalidEvent && <div className='error-message'><p>INVALID:</p><p>Complete All Fields</p></div>}

          <input type='text' id='event-name' className='event-input' placeholder='Enter Event Name'/>

          <input type='text' id='event-location' className='event-input' placeholder='Enter Event Location'/>

          <input type='text' id='event-date' className='event-input' placeholder='Enter Event Date'/>

          <input type='text' id='event-cost' className='event-input' placeholder='Enter Event Cost'/>

          <button className='nav-btn' onClick={ this.eventInfo }>Upload Event</button>
          <button className='nav-btn' onClick={ exitLogin }>Exit</button>

        </div>
      </div>
    );
  }
}

export default CreateEvent;
